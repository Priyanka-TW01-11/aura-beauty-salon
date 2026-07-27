import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { salon } from '../data/mockData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    // In production this posts to Firestore ("enquiries" collection) or
    // a serverless email function — see README for the swap-in points.
    setSent(true);
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionHeading
            eyebrow="Get In Touch"
            title="We'd love to hear from you"
            subtitle="Questions about a service, a group booking, or a collaboration? Send us a
            message and we'll reply within a few hours."
          />
          <div className="space-y-5 mt-8">
            <div className="flex gap-3 items-start">
              <MapPin size={18} className="text-rose mt-1" />
              <p className="font-body text-sm text-ink/70">{salon.address}</p>
            </div>
            <div className="flex gap-3 items-start">
              <Phone size={18} className="text-rose mt-1" />
              <a href={`tel:${salon.phone.replace(/\s/g, '')}`} className="font-body text-sm text-ink/70">
                {salon.phone}
              </a>
            </div>
            <div className="flex gap-3 items-start">
              <Mail size={18} className="text-rose mt-1" />
              <a href={`mailto:${salon.email}`} className="font-body text-sm text-ink/70">
                {salon.email}
              </a>
            </div>
            <div className="flex gap-3 items-start">
              <Clock size={18} className="text-rose mt-1" />
              <p className="font-body text-sm text-ink/70">{salon.hours}</p>
            </div>
          </div>
        </div>

        <div className="bg-blush/40 rounded-3xl p-6 sm:p-8">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <CheckCircle2 size={40} className="text-rose mb-3" />
              <p className="font-display text-2xl text-plum">Message sent</p>
              <p className="font-body text-sm text-ink/60 mt-2">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <label className="block">
                <span className="font-body text-sm text-ink/60">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="font-body text-sm text-ink/60">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="font-body text-sm text-ink/60">Message</span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                />
              </label>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 font-body bg-plum text-ivory px-6 py-3.5 rounded-full hover:bg-rosedark transition-colors"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
