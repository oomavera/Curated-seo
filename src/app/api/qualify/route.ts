import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

async function sendTelegram(text: string) {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) {
    return { ok: false, reason: 'missing_env' as const };
  }
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
  let body: string | undefined;
  try { body = await res.text(); } catch {}
  if (!res.ok) {
    console.error('Telegram API error', res.status, body);
  }
  return { ok: res.ok, status: res.status, body } as const;
}

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json() as { answers?: Record<string, string> };
    if (!answers) return NextResponse.json({ error: 'Missing answers' }, { status: 400 });

    // Persist to Supabase in a generic table
    try {
      await supabase.from('qualified_leads').insert([{ answers }]);
    } catch (dbErr) {
      console.error('QUALIFY DB insert failed', dbErr);
    }

    // Telegram notification
    const message = `QUALIFIED LEAD\n\n${Object.entries(answers).map(([k,v]) => `• ${k}: ${v || ''}`).join('\n')}`;
    const tg = await sendTelegram(message);
    if (!tg.ok) {
      console.error('QUALIFY Telegram send failed', tg);
    }
    // Always return success to the UI; we can inspect telegram flag if needed
    return NextResponse.json({ success: true, pixel: { event: 'Lead' }, telegram: tg.ok }, { status: 200 });
  } catch (e) {
    console.error('QUALIFY API error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}


