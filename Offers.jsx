import { useEffect, useState } from 'react';
import { Copy, Check, Tag } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { offers } from '../data/mockData';

function useCountdown(days) {
  const target = useState(() => Date.now() + days * 86400000)[0];
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const t = setInterval(() => setRemaining(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);

  const clamped = Math.max(0, remaining);
  const d = Math.floor(clamped / 86400000);
  const h = Math.floor((clamped % 86400000) / 3600000);
  const m = Math.floor((clamped % 3600000) / 60000);
  const s = Math.floor((clamped % 60000) / 1000);
  return { d, h, m, s };
}

function OfferCard({ offer }) {
  const { d, h, m, s } = useCountdown(offer.endsInDays);
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard?.writeText(offer.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft flex flex-col">
      <div className="w-11 h-11 rounded-full bg-blush flex items-center justify-center text-rose mb-4">
        <Tag size={18} />
      </div>
      <h3 className="font-display text-2xl text-plum">{offer.title}</h3>
      <p className="font-body text-sm text-ink/60 mt-2 flex-1">{offer.detail}</p>

      <div className="grid grid-cols-4 gap-2 my-5 text-center">
        {[{ v: d, l: 'D' }, { v: h, l: 'H' }, { v: m, l: 'M' }, { v: s, l: 'S' }].map(({ v, l }) => (
          <div key={l} className="bg-plum text-ivory rounded-xl py-2">
            <p className="font-display text-lg leading-none">{String(v).padStart(2, '0')}</p>
            <p className="font-body text-[10px] text-goldlight mt-1">{l}</p>
          </div>
        ))}
      </div>

      <button
        onClick={copyCode}
        className="flex items-center justify-between font-body text-sm border border-dashed border-rose rounded-xl px-4 py-2.5 text-rose hover:bg-blush/40 transition-colors"
      >
        <span className="tracking-widest">{offer.code}</span>
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
    </div>
  );
}

export default function Offers() {
  return (
    <section id="offers" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Limited Time"
          title="Offers worth booking for"
          subtitle="Copy a code below and mention it when you book — online or on WhatsApp."
        />
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </div>
    </section>
  );
}
