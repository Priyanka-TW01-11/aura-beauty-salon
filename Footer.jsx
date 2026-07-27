import { Sparkles, Instagram, Phone, Mail } from 'lucide-react';
import { salon } from '../data/mockData';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      ['Home', '#home'],
      ['About', '#about'],
      ['Services', '#services'],
      ['Pricing', '#pricing'],
      ['Gallery', '#gallery'],
    ],
  },
  {
    title: 'AI Tools',
    links: [
      ['AI Skin Quiz', '#skin-quiz'],
      ['AI Hairstyle Finder', '#hairstyle-ai'],
      ['Book with AI Concierge', '#booking'],
    ],
  },
  {
    title: 'More',
    links: [
      ['Bridal Makeup', '#bridal'],
      ['Reviews', '#testimonials'],
      ['Offers', '#offers'],
      ['Contact', '#contact'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-plumdark text-ivory pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <a href="#home" className="flex items-center gap-2 font-display text-2xl">
            <Sparkles size={20} className="text-gold" /> Aura<span className="text-rose">.</span>
          </a>
          <p className="font-body text-sm text-ivory/60 mt-4 max-w-xs">{salon.tagline}</p>
          <div className="flex gap-3 mt-5">
            <a href={`https://instagram.com/${salon.instagram}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-plum transition-colors">
              <Instagram size={15} />
            </a>
            <a href={`https://wa.me/${salon.whatsapp}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-plum transition-colors">
              <Phone size={15} />
            </a>
            <a href={`mailto:${salon.email}`} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-plum transition-colors">
              <Mail size={15} />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-display text-lg text-goldlight">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="font-body text-sm text-ivory/60 hover:text-ivory transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2">
        <p className="font-body text-xs text-ivory/40">© {new Date().getFullYear()} Aura Beauty Lounge, Pune. All rights reserved.</p>
        <p className="font-body text-xs text-ivory/40">Built with React, Tailwind CSS &amp; Firebase.</p>
      </div>
    </footer>
  );
}
