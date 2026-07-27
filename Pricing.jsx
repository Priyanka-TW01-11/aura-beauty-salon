import { useState } from 'react';
import { Check } from 'lucide-react';
import SectionHeading from './SectionHeading';
import useInView from '../hooks/useInView';
import { pricingTiers } from '../data/mockData';

export default function Pricing() {
  const [active, setActive] = useState(pricingTiers[0].category);
  const [ref, inView] = useInView();
  const current = pricingTiers.find((c) => c.category === active);

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Investment"
          title="Transparent pricing, no surprises"
          subtitle="Indicative starting prices — your stylist will confirm the exact quote based on
          hair length, skin condition or design complexity before you commit."
        />

        <div className="flex gap-2 mt-8 overflow-x-auto pb-2">
          {pricingTiers.map((c) => (
            <button
              key={c.category}
              onClick={() => setActive(c.category)}
              className={`font-body text-sm px-5 py-2.5 rounded-full whitespace-nowrap transition-colors ${
                active === c.category ? 'bg-plum text-ivory' : 'bg-blush/60 text-ink/70 hover:bg-blush'
              }`}
            >
              {c.category}
            </button>
          ))}
        </div>

        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} grid sm:grid-cols-3 gap-6 mt-8`}>
          {current.plans.map((plan) => (
            <div
              key={plan.tier}
              className={`rounded-3xl p-7 border ${
                plan.featured ? 'border-gold bg-plum text-ivory shadow-soft scale-[1.02]' : 'border-blush bg-ivory'
              }`}
            >
              {plan.featured && (
                <span className="font-body text-[11px] tracking-widest uppercase bg-gold text-plum px-3 py-1 rounded-full">
                  Most booked
                </span>
              )}
              <h3 className={`font-display text-2xl mt-4 ${plan.featured ? 'text-ivory' : 'text-plum'}`}>
                {plan.tier}
              </h3>
              <p className={`font-display text-4xl mt-2 ${plan.featured ? 'text-goldlight' : 'text-rose'}`}>
                ₹{plan.price.toLocaleString('en-IN')}
              </p>
              <ul className="mt-5 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-sm">
                    <Check size={16} className={plan.featured ? 'text-goldlight mt-0.5' : 'text-rose mt-0.5'} />
                    <span className={plan.featured ? 'text-ivory/90' : 'text-ink/70'}>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                className={`mt-6 block text-center font-body px-5 py-3 rounded-full transition-colors ${
                  plan.featured
                    ? 'bg-gold text-plum hover:bg-goldlight'
                    : 'bg-plum text-ivory hover:bg-rosedark'
                }`}
              >
                Book this plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
