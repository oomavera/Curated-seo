import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json() as { answers?: Record<string, string> };
    if (!answers) return NextResponse.json({ error: 'Missing answers' }, { status: 400 });

    // Compose a special name that encodes QUALIFY answers for the lead-notify function to parse
    const safe = (s?: string) => (s || '').toString().trim();
    const encodedName = `${safe(answers.name) || 'Unknown'} | QUALIFIED: ` +
      [
        `ownsHome=${safe(answers.ownsHome)}`,
        `squareFootage=${safe(answers.squareFootage)}`,
        `frequency=${safe(answers.frequency)}`,
        `priority=${safe(answers.priority)}`,
      ].join('; ');

    // Insert a minimal lead to trigger Supabase webhook → lead-notify (Telegram)
    // Keep the payload minimal to avoid schema drift issues.
    try {
      await supabase.from('leads').insert([{
        name: encodedName,
        phone: '+1 (000) 000-0000',
        email: `noemail+qualify-${Date.now()}@curatedcleanings.com`,
      }]);
    } catch (dbErr) {
      console.error('QUALIFY leads insert failed', dbErr);
    }

    // Return success (Telegram is handled asynchronously by Supabase function)
    return NextResponse.json({ success: true, pixel: { event: 'Lead' } }, { status: 200 });
  } catch (e) {
    console.error('QUALIFY API error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}


