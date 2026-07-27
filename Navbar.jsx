import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#skin-quiz', label: 'AI Skin Quiz' },
  { href: '#hairstyle-ai', label: 'AI Hairstyle' },
  { href: '#bridal', label: 'Bridal' },
  { href: '#booking', label: 'Book Now' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#offers', label: 'Offers' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onStaffLogin }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'bg-ivory/95 shadow-soft backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <a href="#home" className="flex items-center gap-2 font-display text-2xl text-plum">
          <Sparkles size={20} className="text-gold" />
          Aura<span className="text-rose">.</span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm text-ink/70 hover:text-rose transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onStaffLogin}
            className="font-body text-sm text-ink/60 hover:text-rose transition-colors"
          >
            Staff Login
          </button>
          <a
            href="#booking"
            className="font-body text-sm bg-plum text-ivory px-5 py-2.5 rounded-full hover:bg-rosedark transition-colors shadow-gold"
          >
            Book Appointment
          </a>
        </div>

        <button
          className="lg:hidden text-plum"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-ivory border-t border-blush px-5 pb-6 pt-2 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-body text-base py-3 border-b border-blush/60 text-ink/80"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onStaffLogin();
              }}
              className="font-body text-base py-3 text-left text-ink/60"
            >
              Staff Login
            </button>
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="mt-3 text-center font-body bg-plum text-ivory px-5 py-3 rounded-full"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
