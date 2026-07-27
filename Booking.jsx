import { useState } from 'react';
import { CalendarCheck, MessageCircleMore, Search, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import BookingAIAgent from './BookingAIAgent';
import { services, salon } from '../data/mockData';
import { saveBooking, findBookingsByPhone } from '../firebase';

const EMPTY_FORM = { name: '', phone: '', service: services[0].name, date: '', time: '', notes: '' };

function whatsappConfirmLink(booking) {
  const msg = `Hi Aura Beauty Lounge! Please confirm my booking ${booking.id}: ${booking.service} on ${booking.date} at ${booking.time}, name ${booking.name}.`;
  return `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export default function Booking() {
  const [mode, setMode] = useState('form'); // 'form' | 'ai'
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirmed, setConfirmed] = useState(null);
  const [saving, setSaving] = useState(false);
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupResults, setLookupResults] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submitForm(e) {
    e.preventDefault();
    setSaving(true);
    const record = await saveBooking(form);
    setSaving(false);
    setConfirmed(record);
  }

  async function handleAiConfirmed(summary) {
    const record = await saveBooking({ summary, source: 'ai-concierge', name: '', phone: '', service: 'AI-assisted booking', date: '', time: '' });
    setConfirmed({ ...record, aiSummary: summary });
  }

  async function runLookup(e) {
    e.preventDefault();
    const results = await findBookingsByPhone(lookupPhone.trim());
    setLookupResults(results);
  }

  if (confirmed) {
    return (
      <section id="booking" className="py-20 sm:py-28 bg-blush/40">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <CheckCircle2 size={48} className="mx-auto text-rose mb-4" />
          <h2 className="font-display text-4xl text-plum">Booking Confirmed</h2>
          <p className="font-body text-ink/60 mt-3">
            Reference <span className="font-semibold text-rose">{confirmed.id}</span>
            {confirmed.aiSummary ? (
              <> — {confirmed.aiSummary}</>
            ) : (
              <>
                {' '}for <strong>{confirmed.service}</strong> on <strong>{confirmed.date || 'your chosen date'}</strong> at{' '}
                <strong>{confirmed.time || 'your chosen time'}</strong>
              </>
            )}
            .
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href={whatsappConfirmLink(confirmed)}
              target="_blank"
              rel="noreferrer"
              className="font-body flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircleMore size={18} /> Confirm on WhatsApp
            </a>
            <button
              onClick={() => {
                setConfirmed(null);
                setForm(EMPTY_FORM);
                setMode('form');
              }}
              className="font-body border border-rose text-rose px-6 py-3 rounded-full hover:bg-blush/50 transition-colors"
            >
              Book another appointment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 sm:py-28 bg-blush/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Reserve Your Slot"
          title="Book online in under a minute"
          subtitle="Fill the quick form, or chat with our AI concierge if you'd rather describe
          what you want in your own words."
        />

        <div className="flex gap-2 mt-8">
          <button
            onClick={() => setMode('form')}
            className={`font-body text-sm px-5 py-2.5 rounded-full flex items-center gap-2 ${
              mode === 'form' ? 'bg-plum text-ivory' : 'bg-white text-ink/60'
            }`}
          >
            <CalendarCheck size={15} /> Quick Form
          </button>
          <button
            onClick={() => setMode('ai')}
            className={`font-body text-sm px-5 py-2.5 rounded-full flex items-center gap-2 ${
              mode === 'ai' ? 'bg-plum text-ivory' : 'bg-white text-ink/60'
            }`}
          >
            <MessageCircleMore size={15} /> AI Concierge Chat
          </button>
        </div>

        <div className="mt-8 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {mode === 'form' ? (
              <form onSubmit={submitForm} className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="font-body text-sm text-ink/60">Full name</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                      placeholder="Ananya Rao"
                    />
                  </label>
                  <label className="block">
                    <span className="font-body text-sm text-ink/60">Phone number</span>
                    <input
                      required
                      pattern="[0-9]{10}"
                      title="10-digit phone number"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                      placeholder="98765 43210"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-body text-sm text-ink/60">Service</span>
                  <select
                    value={form.service}
                    onChange={(e) => update('service', e.target.value)}
                    className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </label>

                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="font-body text-sm text-ink/60">Preferred date</span>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                      className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                    />
                  </label>
                  <label className="block">
                    <span className="font-body text-sm text-ink/60">Preferred time</span>
                    <input
                      required
                      type="time"
                      value={form.time}
                      onChange={(e) => update('time', e.target.value)}
                      className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-body text-sm text-ink/60">Notes (optional)</span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    rows={3}
                    className="mt-1.5 w-full font-body bg-ivory border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="Any allergies, reference photos, or special requests"
                  />
                </label>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full font-body bg-plum text-ivory px-6 py-3.5 rounded-full hover:bg-rosedark transition-colors disabled:opacity-50"
                >
                  {saving ? 'Confirming…' : 'Confirm Booking'}
                </button>
              </form>
            ) : (
              <BookingAIAgent onConfirmed={handleAiConfirmed} />
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <h3 className="font-display text-xl text-plum mb-1">Find my bookings</h3>
              <p className="font-body text-xs text-ink/50 mb-4">Look up existing bookings by phone number.</p>
              <form onSubmit={runLookup} className="flex gap-2">
                <input
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value)}
                  placeholder="10-digit phone"
                  className="flex-1 font-body text-sm bg-ivory border border-blushdark/60 rounded-full px-4 py-2.5 focus:outline-none focus:border-gold"
                />
                <button className="w-10 h-10 shrink-0 rounded-full bg-plum text-ivory flex items-center justify-center">
                  <Search size={15} />
                </button>
              </form>
              {lookupResults && (
                <div className="mt-4 space-y-2">
                  {lookupResults.length === 0 ? (
                    <p className="font-body text-sm text-ink/50">No bookings found for that number yet.</p>
                  ) : (
                    lookupResults.map((b) => (
                      <div key={b.id} className="font-body text-sm bg-blush/40 rounded-xl px-4 py-3">
                        <span className="text-rose font-semibold">{b.id}</span> — {b.service} on {b.date} at {b.time}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="bg-plum text-ivory rounded-3xl p-6 shadow-soft">
              <h3 className="font-display text-xl">Salon hours</h3>
              <p className="font-body text-sm text-ivory/80 mt-2">{salon.hours}</p>
              <h3 className="font-display text-xl mt-4">Need help now?</h3>
              <a
                href={`https://wa.me/${salon.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-body text-sm bg-[#25D366] text-white px-4 py-2.5 rounded-full"
              >
                <MessageCircleMore size={15} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
