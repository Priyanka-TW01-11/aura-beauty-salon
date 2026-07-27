import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { salon, services } from '../data/mockData';

const GREETING = {
  role: 'assistant',
  content: `Hi! I'm Aura, your booking concierge. Tell me what you'd like to book — for example
"bridal makeup on 14 December at 11am for Ananya, 9876543210" — and I'll take it from there.`,
};

// Fallback conversational logic used only when /api/booking-agent reports
// that ANTHROPIC_API_KEY isn't configured yet, so the demo still works.
function localMockReply(history, latestUserText) {
  const text = latestUserText.toLowerCase();
  const hasPhone = /\d{10}/.test(text);
  const serviceMatch = services.find((s) => text.includes(s.name.toLowerCase().split(' ')[0].toLowerCase()));
  const mentionsDate = /\b(\d{1,2}\s?(am|pm)|\d{1,2}[:.]\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{1,2}\/\d{1,2})\b/i.test(text);

  if (hasPhone && mentionsDate) {
    const phone = text.match(/\d{10}/)[0];
    const nameGuess = latestUserText.match(/for ([A-Za-z]+)/i);
    return `BOOKING_CONFIRMED: ${serviceMatch ? serviceMatch.name : 'Salon appointment'}, as discussed, for ${
      nameGuess ? nameGuess[1] : 'you'
    }, phone ${phone}. We'll WhatsApp you a reminder the morning of your visit.`;
  }
  if (!serviceMatch) {
    return `Sure — which service would you like? Popular picks: ${services.slice(0, 3).map((s) => s.name).join(', ')}.`;
  }
  if (!mentionsDate) {
    return `Great choice, ${serviceMatch.name}! What date and time works for you?`;
  }
  return `Got it. Could you share your name and a 10-digit phone number so I can lock in the slot?`;
}

export default function BookingAIAgent({ onConfirmed }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [usingMock, setUsingMock] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    let replyText = '';
    try {
      const res = await fetch('/api/booking-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          context: { salon, services: services.map((s) => ({ name: s.name, from: s.from })) },
        }),
      });
      const data = await res.json();
      if (data.mock) {
        setUsingMock(true);
        replyText = localMockReply(nextMessages, text);
      } else {
        replyText = data.reply || "Sorry, I didn't quite catch that — could you rephrase?";
      }
    } catch {
      setUsingMock(true);
      replyText = localMockReply(nextMessages, text);
    }

    setMessages((m) => [...m, { role: 'assistant', content: replyText }]);
    setLoading(false);

    if (replyText.startsWith('BOOKING_CONFIRMED:')) {
      onConfirmed(replyText.replace('BOOKING_CONFIRMED:', '').trim());
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-soft flex flex-col h-[480px]">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-blush">
        <div className="w-9 h-9 rounded-full bg-plum text-goldlight flex items-center justify-center">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="font-display text-lg text-plum leading-none">Aura AI Concierge</p>
          <p className="font-body text-[11px] text-ink/50 mt-0.5">
            {usingMock ? 'Demo mode — connect ANTHROPIC_API_KEY for live AI' : 'Powered by Claude'}
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                m.role === 'user' ? 'bg-blush text-rose' : 'bg-plum text-goldlight'
              }`}
            >
              {m.role === 'user' ? <User size={13} /> : <Bot size={13} />}
            </div>
            <div
              className={`font-body text-sm rounded-2xl px-4 py-2.5 max-w-[80%] ${
                m.role === 'user' ? 'bg-blush text-ink' : 'bg-ivory text-ink/80'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-plum text-goldlight flex items-center justify-center">
              <Bot size={13} />
            </div>
            <div className="font-body text-sm rounded-2xl px-4 py-2.5 bg-ivory text-ink/40">Typing…</div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-blush">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type your message…"
          className="flex-1 font-body text-sm bg-blush/40 rounded-full px-4 py-2.5 focus:outline-none"
        />
        <button
          onClick={send}
          disabled={loading}
          className="w-10 h-10 rounded-full bg-plum text-ivory flex items-center justify-center hover:bg-rosedark transition-colors disabled:opacity-40"
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
