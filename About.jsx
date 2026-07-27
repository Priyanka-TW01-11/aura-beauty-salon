import { Award, Users, Leaf, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import useInView from '../hooks/useInView';

const POINTS = [
  { icon: Award, label: 'Certified artists', detail: 'Trained in Mumbai, Seoul & Paris academies' },
  { icon: Leaf, label: 'Clean formulations', detail: 'Dermat-approved, cruelty-free product lines' },
  { icon: Users, label: '1,200+ regulars', detail: 'Pune clients who rebook every month' },
  { icon: Sparkles, label: 'AI-personalised', detail: 'Skin & hairstyle guidance before you even arrive' },
];

export default function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} order-2 lg:order-1 grid grid-cols-2 gap-4`}>
          <img
            src="https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=600&q=80"
            alt="Aura Beauty Lounge salon interior"
            className="rounded-2xl object-cover w-full h-56 sm:h-72"
            onError={(e) => { e.currentTarget.className += ' bg-gradient-to-br from-blush to-goldlight'; e.currentTarget.removeAttribute('src'); }}
          />
          <img
            src="https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=600&q=80"
            alt="Aura Beauty Lounge stylist at work"
            className="rounded-2xl object-cover w-full h-56 sm:h-72 mt-8"
            onError={(e) => { e.currentTarget.className += ' bg-gradient-to-br from-rose to-blushdark'; e.currentTarget.removeAttribute('src'); }}
          />
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Our Story"
            title="Six years of making Pune feel a little more radiant"
            subtitle="Aura Beauty Lounge began as a two-chair studio in Koregaon Park and grew into a
            full salon and bridal house, built on one idea: beauty advice should be personal,
            not generic. That's why every service here starts with understanding your skin,
            your hair, and your occasion — with a little help from AI, and a lot of heart."
          />
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {POINTS.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex gap-3">
                <div className="w-11 h-11 shrink-0 rounded-full bg-blush flex items-center justify-center text-rose">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-display text-lg text-plum leading-tight">{label}</p>
                  <p className="font-body text-sm text-ink/60">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
