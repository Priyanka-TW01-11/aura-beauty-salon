import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { faceShapes, hairLengths, occasions, recommendHairstyle } from '../data/mockData';

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="font-body text-sm text-ink/60">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
      >
        <option value="">Choose an option</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function HairstyleAI() {
  const [faceShape, setFaceShape] = useState('');
  const [hairLength, setHairLength] = useState('');
  const [occasion, setOccasion] = useState('');
  const [result, setResult] = useState(null);

  const canSubmit = faceShape && hairLength && occasion;

  function analyse(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setResult(recommendHairstyle({ faceShape, hairLength, occasion }));
  }

  return (
    <section id="hairstyle-ai" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading
            eyebrow="AI Hairstyle Finder"
            title="Find a style your stylist can shape in one visit"
            subtitle="Tell us your face shape, hair length and the occasion — our recommendation
            engine suggests a direction, and your stylist fine-tunes it in person."
          />
          <form onSubmit={analyse} className="mt-8 bg-white rounded-3xl p-6 sm:p-8 shadow-soft space-y-5">
            <Select label="Face shape" value={faceShape} onChange={setFaceShape} options={faceShapes} />
            <Select label="Current hair length" value={hairLength} onChange={setHairLength} options={hairLengths} />
            <Select label="Occasion" value={occasion} onChange={setOccasion} options={occasions} />
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full flex items-center justify-center gap-2 font-body bg-plum text-ivory px-6 py-3.5 rounded-full hover:bg-rosedark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Wand2 size={16} /> Get my AI recommendation
            </button>
          </form>
        </div>

        <div className="bg-plum rounded-3xl p-8 sm:p-10 text-ivory shadow-soft min-h-[320px] flex flex-col justify-center">
          {result ? (
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-goldlight mb-2">
                {result.headline}
              </p>
              <h3 className="font-display text-3xl leading-snug mb-4">{result.style}</h3>
              <p className="font-body text-ivory/80 leading-relaxed">{result.lengthNote}</p>
              <p className="font-body text-ivory/80 leading-relaxed mt-3">{result.occasionNote}</p>
              <a
                href="#booking"
                className="mt-6 inline-block font-body bg-gold text-plum px-6 py-3 rounded-full hover:bg-goldlight transition-colors"
              >
                Book {result.suggestedService}
              </a>
            </div>
          ) : (
            <div className="text-center">
              <Wand2 size={32} className="mx-auto text-goldlight mb-4" />
              <p className="font-display text-2xl">Your recommendation will appear here</p>
              <p className="font-body text-ivory/70 mt-2 text-sm">
                Fill in the three fields on the left to see a style direction picked for you.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
