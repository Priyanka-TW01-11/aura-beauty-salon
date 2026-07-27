// ─────────────────────────────────────────────────────────────────
// FIREBASE — PLACEHOLDER CONFIG
// Replace the values below (or better, the VITE_FIREBASE_* vars in
// your .env file) with your real Firebase project's config from:
// Firebase Console → Project settings → General → Your apps → SDK setup
//
// Until you do, `isFirebaseConfigured` is false and every function in
// this file transparently falls back to a localStorage-based mock —
// so bookings, "my account", and the admin login all work fully in
// the browser with zero backend setup. Nothing elsewhere in the app
// needs to change when you flip this over to real Firebase.
// ─────────────────────────────────────────────────────────────────

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_FIREBASE_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_PROJECT.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_PROJECT.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
};

export const isFirebaseConfigured = firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY';

let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;

// Real Firebase SDK is only imported/initialized once real keys exist,
// so the mock path never pays the bundle cost during the demo.
async function getRealFirebase() {
  if (firebaseApp) return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth };
  const { initializeApp } = await import('firebase/app');
  const { getFirestore } = await import('firebase/firestore');
  const { getAuth } = await import('firebase/auth');
  firebaseApp = initializeApp(firebaseConfig);
  firestoreDb = getFirestore(firebaseApp);
  firebaseAuth = getAuth(firebaseApp);
  return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth };
}

// ── Mock storage helpers (localStorage) ─────────────────────────
const LS_BOOKINGS = 'aura_mock_bookings';
const LS_USERS = 'aura_mock_users';
const LS_SESSION = 'aura_mock_session';

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Seed a demo staff account so "login details" work immediately.
function ensureSeedUser() {
  const users = readLS(LS_USERS, []);
  if (!users.find((u) => u.email === 'admin@aurabeautylounge.in')) {
    users.push({ email: 'admin@aurabeautylounge.in', password: 'AuraAdmin@123', role: 'staff' });
    writeLS(LS_USERS, users);
  }
}
ensureSeedUser();

// ── Unified API used by the rest of the app ─────────────────────

export async function saveBooking(booking) {
  const record = {
    id: `AURA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
    ...booking,
  };

  if (isFirebaseConfigured) {
    const { db } = await getRealFirebase();
    const { collection, addDoc } = await import('firebase/firestore');
    const ref = await addDoc(collection(db, 'bookings'), record);
    return { ...record, docId: ref.id };
  }

  const bookings = readLS(LS_BOOKINGS, []);
  bookings.unshift(record);
  writeLS(LS_BOOKINGS, bookings);
  return record;
}

export async function getBookings() {
  if (isFirebaseConfigured) {
    const { db } = await getRealFirebase();
    const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
  }
  return readLS(LS_BOOKINGS, []);
}

export async function findBookingsByPhone(phone) {
  const all = await getBookings();
  return all.filter((b) => b.phone === phone);
}

export async function signIn(email, password) {
  if (isFirebaseConfigured) {
    const { auth } = await getRealFirebase();
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return { email: cred.user.email, role: 'staff' };
  }

  const users = readLS(LS_USERS, []);
  const match = users.find((u) => u.email === email && u.password === password);
  if (!match) throw new Error('Invalid email or password.');
  writeLS(LS_SESSION, { email: match.email, role: match.role });
  return match;
}

export function getSession() {
  if (isFirebaseConfigured) return null; // real auth state handled via onAuthStateChanged in-app
  return readLS(LS_SESSION, null);
}

export function signOutSession() {
  localStorage.removeItem(LS_SESSION);
}
