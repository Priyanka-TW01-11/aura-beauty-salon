import { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { skinTypes, skinConcerns, skinGoals, recommendSkincare } from '../data/mockData';

const STEPS = [
  { key: 'skinType', label: "What's your skin type?", options: skinTypes },
  { key: 'concern', label: 'What concerns you most right now?', options: skinConcerns },
  { key: 'goal', label: "What's your skincare goal?", options: skinGoals },
];

export default function SkinQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  function choose(key, value) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setResult(
        recommendSkincare({
          skinType: next.skinType,
          concern: next.concern,
          goal: next.goal,
        })
      );
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  return (
    <section id="skin-quiz" className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="AI Skin Quiz"
          title="Let AI match you to the right facial"
          subtitle="Three quick questions — our recommendation engine instantly matches your
          answers to the facial and at-home routine our estheticians would suggest in person."
        />

        <div className="mt-10 bg-blush/40 rounded-3xl p-6 sm:p-10 shadow-soft">
          {!result ? (
            <>
              <div className="flex gap-2 mb-8">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-rose' : 'bg-blushdark/60'}`}
                  />
                ))}
              </div>
              <p className="font-body text-xs tracking-widest uppercase text-rose mb-2">
                Question {step + 1} of {STEPS.length}
              </p>
              <h3 className="font-display text-3xl text-plum mb-6">{STEPS[step].label}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {STEPS[step].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => choose(STEPS[step].key, opt)}
                    className="text-left font-body bg-ivory hover:bg-gold/20 border border-blushdark/50 hover:border-gold rounded-2xl px-5 py-4 transition-colors flex items-center justify-between group"
                  >
                    {opt}
                    <ArrowRight size={16} className="text-rose opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 font-body text-sm text-ink/50 hover:text-rose"
                >
                  ← Back
                </button>
              )}
            </>
          ) : (
            <div>
              <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center text-plum mb-5">
                <Sparkles size={24} />
              </div>
              <p className="font-body text-xs tracking-widest uppercase text-rose mb-2">Your AI recommendation</p>
              <h3 className="font-display text-3xl text-plum mb-4">{result.treatment}</h3>
              <p className="font-body text-ink/70 leading-relaxed">{result.summary}</p>
              <div className="flex flex-wrap gap-3 mt-7">
                <a
                  href="#booking"
                  className="font-body bg-plum text-ivory px-6 py-3 rounded-full hover:bg-rosedark transition-colors"
                >
                  Book the {result.treatment}
                </a>
                <button
                  onClick={reset}
                  className="font-body flex items-center gap-2 border border-rose text-rose px-6 py-3 rounded-full hover:bg-blush/50 transition-colors"
                >
                  <RotateCcw size={16} /> Retake quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
