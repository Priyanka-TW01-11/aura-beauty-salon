import { Star, MapPin, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blush blur-3xl opacity-70" />
      <div className="absolute top-40 -left-16 w-56 h-56 rounded-full bg-goldlight/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-rose bg-blush/60 px-4 py-2 rounded-full">
            <MapPin size={14} /> Koregaon Park, Pune
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-plum mt-6">
            Where every <span className="italic text-rose">reflection</span> feels like a celebration
          </h1>
          <p className="font-body text-ink/70 text-base sm:text-lg mt-6 max-w-lg">
            Hair, skin, bridal makeup, nails and spa — guided by AI-personalised
            recommendations and finished by artists who treat every client like a bride.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#booking"
              className="font-body bg-plum text-ivory px-7 py-3.5 rounded-full hover:bg-rosedark transition-colors shadow-gold"
            >
              Book an Appointment
            </a>
            <a
              href="#skin-quiz"
              className="font-body flex items-center gap-2 border border-rose text-rose px-7 py-3.5 rounded-full hover:bg-blush/50 transition-colors"
            >
              <Sparkles size={16} /> Try the AI Skin Quiz
            </a>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-10 h-10 rounded-full border-2 border-ivory bg-gradient-to-br from-rose to-goldlight"
                />
              ))}
            </div>
            <div>
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-body text-xs text-ink/60">4.9 from 1,200+ clients in Pune</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2.5rem] overflow-hidden shadow-soft aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
              alt="Bridal makeup artist at Aura Beauty Lounge, Pune"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.classList.add('bg-gradient-to-br', 'from-blush', 'to-rose');
              }}
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-ivory rounded-2xl shadow-soft px-5 py-4 animate-floatY hidden sm:block">
            <p className="font-display text-3xl text-plum leading-none">6+</p>
            <p className="font-body text-xs text-ink/60 mt-1">Years of artistry in Pune</p>
          </div>
        </div>
      </div>
    </section>
  );
}
