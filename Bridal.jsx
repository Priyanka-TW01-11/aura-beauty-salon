import { Check } from 'lucide-react';
import SectionHeading from './SectionHeading';
import useInView from '../hooks/useInView';
import { pricingTiers } from '../data/mockData';

const bridalPlans = pricingTiers.find((c) => c.category === 'Bridal').plans;

export default function Bridal() {
  const [ref, inView] = useInView();
  return (
    <section id="bridal" className="py-20 sm:py-28 bg-plum text-ivory relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
          <div className="rounded-[2.5rem] overflow-hidden shadow-soft aspect-[4/5] max-w-md">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80"
              alt="Bridal makeup look by Aura Beauty Lounge"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.parentElement.classList.add('bg-gradient-to-br', 'from-rose', 'to-goldlight'); e.currentTarget.remove(); }}
            />
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Bridal Studio"
            title="Your wedding look, rehearsed until it's perfect"
            subtitle="Every bridal package includes a trial session, a dedicated artist team on the
            day, and a touch-up kit so you glow from the mandap to the after-party."
            light
          />
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {bridalPlans.map((plan) => (
              <div key={plan.tier} className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
                <p className="font-display text-xl">{plan.tier}</p>
                <p className="font-display text-2xl text-goldlight mt-1">₹{plan.price.toLocaleString('en-IN')}</p>
                <ul className="mt-3 space-y-2">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2 font-body text-xs text-ivory/80">
                      <Check size={14} className="text-goldlight mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <a
            href="#booking"
            className="mt-8 inline-block font-body bg-gold text-plum px-7 py-3.5 rounded-full hover:bg-goldlight transition-colors"
          >
            Reserve Your Bridal Trial
          </a>
        </div>
      </div>
    </section>
  );
}
