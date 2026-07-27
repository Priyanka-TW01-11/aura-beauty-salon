import { useEffect, useState } from 'react';
import { X, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { signIn, getBookings, getSession, signOutSession, isFirebaseConfigured } from '../firebase';

export default function StaffLoginModal({ open, onClose }) {
  const [email, setEmail] = useState('admin@aurabeautylounge.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState(getSession());
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (session) getBookings().then(setBookings);
  }, [session]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const s = await signIn(email, password);
      setSession(s);
    } catch (err) {
      setError(err.message || 'Could not sign in.');
    }
  }

  function handleLogout() {
    signOutSession();
    setSession(null);
  }

  return (
    <div className="fixed inset-0 z-50 bg-plumdark/60 flex items-center justify-center px-4">
      <div className="bg-ivory rounded-3xl shadow-soft w-full max-w-md p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 text-ink/50" aria-label="Close">
          <X size={22} />
        </button>

        {!session ? (
          <>
            <div className="w-11 h-11 rounded-full bg-blush flex items-center justify-center text-rose mb-4">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-display text-2xl text-plum">Staff Login</h3>
            <p className="font-body text-xs text-ink/50 mt-1 mb-5">
              {isFirebaseConfigured
                ? 'Sign in with your Firebase Auth staff account.'
                : 'Demo mode — use admin@aurabeautylounge.in / AuraAdmin@123'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="font-body text-sm text-ink/60">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full font-body bg-white border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="font-body text-sm text-ink/60">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full font-body bg-white border border-blushdark/60 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                />
              </label>
              {error && <p className="font-body text-sm text-rosedark">{error}</p>}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 font-body bg-plum text-ivory px-6 py-3 rounded-full hover:bg-rosedark transition-colors"
              >
                <LogIn size={16} /> Sign In
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl text-plum">Bookings Dashboard</h3>
              <button onClick={handleLogout} className="font-body text-sm flex items-center gap-1 text-rose">
                <LogOut size={14} /> Log out
              </button>
            </div>
            <p className="font-body text-xs text-ink/50 mb-4">Signed in as {session.email}</p>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {bookings.length === 0 ? (
                <p className="font-body text-sm text-ink/50">No bookings yet — they'll show up here as clients book.</p>
              ) : (
                bookings.map((b) => (
                  <div key={b.id} className="bg-blush/40 rounded-xl px-4 py-3 font-body text-sm">
                    <p className="text-rose font-semibold">{b.id}</p>
                    <p className="text-ink/70">
                      {b.service || b.summary} {b.date && `• ${b.date}`} {b.time && `at ${b.time}`}
                    </p>
                    {b.name && <p className="text-ink/50 text-xs">{b.name} · {b.phone}</p>}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
