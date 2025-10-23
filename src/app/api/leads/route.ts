import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendMetaLeadEvent } from '@/lib/meta';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('API received payload:', body);
    const { name, phone, email, eventId, externalId, page } = body as { name?: string; phone?: string; email?: string; eventId?: string; externalId?: string; page?: string };

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name and phone' },
        { status: 400 }
      );
    }

    // Optional email validation - only validate if email is provided
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Basic phone validation (US format)
    const phoneRegex = /^[\+]?[1]?[\s\-\.\(\)]?[\d\s\-\.\(\)]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Normalize optional fields
    const service: string = body.service && typeof body.service === 'string'
      ? body.service
      : (body.quote ? 'estimate_request' : 'contact_form');

    // First attempt: insert minimal fields (and include quote_payload if provided) so webhook gets answers on INSERT
    const minimalPayload: Record<string, unknown> = {
      name: name.trim(),
      phone: phone.trim(),
      // Provide a placeholder email when none is supplied to satisfy NOT NULL DB constraint
      email: (() => {
        const provided = (email || '').trim();
        if (provided) return provided.toLowerCase();
        const cleanedPhone = phone.replace(/\D/g, '').slice(-10) || 'user';
        return `noemail+${cleanedPhone}-${Date.now()}@curatedcleanings.com`;
      })(),
      // Include page in initial insert so webhook gets it immediately
      ...(page ? { page } : {}),
    };
    // Do not include quote_payload unless your DB has that column. Keep leads insert minimal so regular /offer works.

    console.log('Attempting database insert with:', minimalPayload);
    
    const { data, error } = await supabase
      .from('leads')
      .insert([minimalPayload])
      .select('id')
      .single();
      
    console.log('Database response:', { data, error });

    // Remove the address retry logic since the column doesn't exist

    if (!error) {
      // Best-effort: attach optional fields if extended schema exists; ignore failures
      const extendedPayload: Record<string, unknown> = {};
      const hasService = typeof body.service === 'string' || body.quote;
      if (hasService) extendedPayload.service = service;
      // Add page field if provided
      if (page) extendedPayload.page = page;

      console.log('Extended payload to update:', extendedPayload);

      if (Object.keys(extendedPayload).length > 0) {
        try {
          const updateResult = await supabase
            .from('leads')
            .update(extendedPayload)
            .eq('id', data?.id as string);
          console.log('Update result:', updateResult);
        } catch (err) {
          console.log('Extended fields update skipped (column may not exist):', err);
        }
      }
    }

    if (error) {
      console.error('Database error (insert lead):', error);
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    // ============================================
    // TEMPORARY TEST CODE - REMOVE AFTER TESTING
    // ============================================
    // Trigger SMS notification for leads from home, /offer, or /offer2 pages
    if (page && ['home', 'offer', 'offer2'].includes(page)) {
      console.log(`📱 Lead from ${page} (${name}, ${phone}) - triggering SMS notification`);

      // Fire SMS in background with customer name and phone
      // Don't wait for response and don't let SMS failures affect lead submission
      fetch(`${request.nextUrl.origin}/api/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(`✅ SMS notification sent successfully for ${name}`);
        } else if (data.skipped) {
          console.log(`⏰ SMS skipped for ${name}: ${data.message}`);
        } else {
          console.error(`⚠️ SMS notification failed for ${name}:`, data.error);
        }
      })
      .catch(err => {
        console.error(`❌ SMS trigger error for ${name} (${phone}):`, err.message || err);
        // Lead is still saved even if SMS fails
      });
    }
    // ============================================
    // END TEMPORARY TEST CODE
    // ============================================

    // Fire Meta Conversions API unless suppressed (best-effort)
    try {
      if (body?.suppressMeta === true) {
        // Skip Meta pixel server event per funnel change
        return NextResponse.json(
          { 
            success: true, 
            message: 'Lead submitted successfully (meta suppressed)',
            leadId: data?.id
          },
          { status: 200 }
        );
      }
      const accessToken = process.env.META_ACCESS_TOKEN as string | undefined;
      const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID as string | undefined || '1290791285375063';
      if (accessToken && pixelId) {
        const headers = request.headers;
        const clientIp = headers.get('x-forwarded-for')?.split(',')[0] || headers.get('x-real-ip') || undefined;
        const userAgent = headers.get('user-agent') || undefined;
        const fbp = request.cookies.get('_fbp')?.value || undefined;
        // Try cookie first; if absent, derive _fbc from fbclid on the referring URL per Meta spec
        let fbc = request.cookies.get('_fbc')?.value || undefined;
        const referer = headers.get('referer') || undefined;
        if (!fbc && referer) {
          try {
            const url = new URL(referer);
            const fbclid = url.searchParams.get('fbclid');
            if (fbclid) {
              const ts = Math.floor(Date.now() / 1000);
              fbc = `fb.1.${ts}.${fbclid}`;
            }
          } catch {}
        }
        await sendMetaLeadEvent({
          pixelId,
          accessToken,
          eventName: 'Lead',
          eventSourceUrl: referer,
          eventId: eventId || null,
          externalId: externalId || null,
          email,
          phone,
          clientIpAddress: clientIp || null,
          clientUserAgent: userAgent || null,
          fbp: fbp || null,
          fbc: fbc || null,
          leadSource: body.source || null,
        });
      }
    } catch (e) {
      console.error('Meta CAPI dispatch error', e);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead submitted successfully',
        leadId: data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}