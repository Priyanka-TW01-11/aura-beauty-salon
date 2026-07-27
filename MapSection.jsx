import { salon } from '../data/mockData';

export default function MapSection() {
  return (
    <section id="map" className="pb-20 sm:pb-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="rounded-3xl overflow-hidden shadow-soft border border-blush">
          <iframe
            title="Aura Beauty Lounge location on Google Maps"
            src={salon.mapsEmbed}
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
