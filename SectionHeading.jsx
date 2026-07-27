import useInView from '../hooks/useInView';

export default function SectionHeading({ eyebrow, title, subtitle, light = false }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} max-w-2xl`}>
      {eyebrow && (
        <p className={`font-body text-xs tracking-[0.3em] uppercase mb-3 ${light ? 'text-goldlight' : 'text-rose'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-4xl sm:text-5xl leading-tight ${light ? 'text-ivory' : 'text-plum'}`}>
        {title}
      </h2>
      <svg
        className={`brush-divider ${inView ? 'in-view' : ''} mt-4 mb-5 w-40 h-4`}
        viewBox="0 0 200 20"
        fill="none"
      >
        <path
          d="M2 12 C 40 4, 70 18, 110 9 S 170 3, 198 11"
          stroke="#C6A15B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      {subtitle && (
        <p className={`font-body text-base leading-relaxed ${light ? 'text-blush/90' : 'text-ink/70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
