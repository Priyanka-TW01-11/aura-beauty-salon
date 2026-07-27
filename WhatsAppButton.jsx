import { MessageCircle } from 'lucide-react';
import { salon } from '../data/mockData';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${salon.whatsapp}?text=${encodeURIComponent('Hi! I would like to know more about Aura Beauty Lounge.')}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-soft hover:scale-105 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
