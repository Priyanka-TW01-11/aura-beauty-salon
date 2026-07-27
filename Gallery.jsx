import { useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { gallery } from '../data/mockData';

export default function Gallery() {
  const categories = useMemo(() => ['All', ...new Set(gallery.map((g) => g.category))], []);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null); // index into filtered array

  const filtered = filter === 'All' ? gallery : gallery.filter((g) => g.category === filter);

  const showNext = () => setLightbox((i) => (i + 1) % filtered.length);
  const showPrev = () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length);

  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="A glimpse of the glow-ups"
          subtitle="Real transformations from real Aura clients — tap any image to view it larger."
        />

        <div className="flex gap-2 mt-8 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`font-body text-sm px-5 py-2 rounded-full whitespace-nowrap transition-colors ${
                filter === c ? 'bg-plum text-ivory' : 'bg-blush/60 text-ink/70 hover:bg-blush'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-2 sm:columns-3 gap-4 mt-8 [column-fill:_balance]">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setLightbox(i)}
              className="mb-4 block w-full rounded-2xl overflow-hidden shadow-soft break-inside-avoid"
            >
              <img
                src={item.image}
                alt={`${item.category} at Aura Beauty Lounge`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.parentElement.classList.add('bg-gradient-to-br', 'from-blush', 'to-rose', 'h-40');
                  e.currentTarget.remove();
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-50 bg-plumdark/90 flex items-center justify-center px-4">
          <button
            className="absolute top-6 right-6 text-ivory"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button className="absolute left-4 sm:left-10 text-ivory" onClick={showPrev} aria-label="Previous">
            <ChevronLeft size={32} />
          </button>
          <img
            src={filtered[lightbox].image}
            alt={filtered[lightbox].category}
            className="max-h-[80vh] max-w-full rounded-2xl shadow-soft"
          />
          <button className="absolute right-4 sm:right-10 text-ivory" onClick={showNext} aria-label="Next">
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
