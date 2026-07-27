import * as Icons from 'lucide-react';
import SectionHeading from './SectionHeading';
import useInView from '../hooks/useInView';
import { services } from '../data/mockData';

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();
  const Icon = Icons[service.icon] || Icons.Sparkles;
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`reveal ${inView ? 'in-view' : ''} group rounded-3xl overflow-hidden bg-white shadow-soft`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center text-plum">
          <Icon size={18} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-plum">{service.name}</h3>
        <p className="font-body text-sm text-ink/60 mt-2 leading-relaxed">{service.blurb}</p>
        <div className="flex items-center justify-between mt-5">
          <span className="font-body text-sm text-rose">From ₹{service.from}</span>
          <a href="#booking" className="font-body text-sm text-plum underline underline-offset-4">
            Book now
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Every service, tailored to you"
          subtitle="From a quick threading appointment to a full bridal transformation — pick a
          category below, or let our AI tools narrow it down for you."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
