import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendMetaLeadEvent } from '@/lib/meta';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('API received payload:', body);
    const { name, phone, email, eventId, externalId } = body as { name?: string; phone?: string; email?: string; eventId?: string; externalId?: string };

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

    // First attempt: insert minimal fields to be compatible with any schema
    const minimalPayload: { name: string; phone: string; email?: string } = {
      name: name.trim(),
      phone: phone.trim(),
    };
    
    // Only include email if it's provided
    if (email && email.trim()) {
      minimalPayload.email = email.toLowerCase().trim();
    }

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
      if (body.quote && typeof body.quote === 'object') {
        extendedPayload.quote_payload = body.quote;
      }

      if (Object.keys(extendedPayload).length > 0) {
        // Try to update with extended fields; swallow errors to not block success path
        try {
          await supabase
            .from('leads')
            .update(extendedPayload)
            .eq('id', data?.id as string);
        } catch {
          // ignore
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

    // Fire Meta Conversions API for /offer leads (best-effort)
    try {
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