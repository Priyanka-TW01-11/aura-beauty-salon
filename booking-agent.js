// Vercel serverless function — POST /api/booking-agent
//
// This is the real brain behind the "Aura AI Concierge" booking chat.
// It keeps ANTHROPIC_API_KEY on the server, never in the browser bundle.
//
// Local dev:   `vercel dev` (needs Vercel CLI + ANTHROPIC_API_KEY in .env)
// Production:  set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables

const SYSTEM_PROMPT = `You are Aura, the friendly AI booking concierge for Aura Beauty Lounge, a
premium beauty salon in Koregaon Park, Pune. You help clients choose a service, pick a
realistic date/time, and confirm their booking. Salon hours: 10:00 AM – 8:00 PM, every day.
Keep replies short (2-4 sentences), warm, and concrete. When the client has given you a
service, a preferred date, a preferred time, and their name + phone number, respond with a
final confirmation message that starts with the exact line "BOOKING_CONFIRMED:" followed by
a one-line summary (service, date, time, name, phone). Never invent a stylist name or price
that wasn't given to you in context; if unsure, ask a brief clarifying question instead.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'YOUR_ANTHROPIC_API_KEY') {
    // No key configured yet — tell the frontend to fall back to its
    // local mock concierge instead of throwing a hard error.
    return res.status(200).json({ mock: true, reason: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    const { messages, context } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const contextNote = context
      ? `\n\nKnown salon context for this request:\n${JSON.stringify(context)}`
      : '';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        system: SYSTEM_PROMPT + contextNote,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return res.status(502).json({ error: 'Upstream AI error' });
    }

    const data = await response.json();
    const text = (data.content || [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return res.status(200).json({ mock: false, reply: text });
  } catch (err) {
    console.error('booking-agent handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
