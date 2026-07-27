import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { testimonials } from '../data/mockData';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <SectionHeading
          eyebrow="Client Love"
          title="Straight from our chairs"
          subtitle="A few words from the clients who trust us with their biggest days."
        />

        <div className="relative mt-10 bg-blush/40 rounded-3xl p-8 sm:p-12">
          <Quote className="mx-auto text-gold" size={32} />
          <p className="font-display text-2xl sm:text-3xl text-plum mt-4 leading-snug">"{t.quote}"</p>
          <div className="flex justify-center text-gold mt-5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="font-body text-sm text-ink/60 mt-3">
            <strong className="text-plum">{t.name}</strong> — {t.service}
          </p>

          <button
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-rose"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="absolute right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-rose"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-rose w-6' : 'bg-blushdark'} transition-all`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
