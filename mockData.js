export const salon = {
  name: 'Aura Beauty Lounge',
  tagline: 'Where every reflection feels like a celebration',
  city: 'Pune',
  address: '2nd Floor, Aura Tower, Koregaon Park Road, Pune 411001',
  phone: '+91 90000 00000',
  whatsapp: '919000000000',
  email: 'hello@aurabeautylounge.in',
  hours: '10:00 AM – 8:00 PM, all days',
  instagram: 'aurabeautylounge',
  mapsEmbed: 'https://www.google.com/maps?q=Koregaon+Park,Pune&output=embed',
};

export const services = [
  {
    id: 'hair',
    name: 'Hair Styling & Colour',
    icon: 'Scissors',
    blurb: 'Cut, colour, keratin & bridal hair by artists trained on the latest Korean and European techniques.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    from: 899,
  },
  {
    id: 'skin',
    name: 'Skin & Facials',
    icon: 'Sparkles',
    blurb: 'Deep-cleanse, brightening and anti-ageing facials using dermat-approved actives.',
    image: 'https://images.unsplash.com/photo-1596178060810-72596cb0d09c?auto=format&fit=crop&w=900&q=80',
    from: 1299,
  },
  {
    id: 'makeup',
    name: 'Makeup & Bridal',
    icon: 'Heart',
    blurb: 'HD, airbrush and traditional bridal looks with trials, drapes and touch-up kits.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    from: 3499,
  },
  {
    id: 'nails',
    name: 'Nail Art & Care',
    icon: 'Gem',
    blurb: 'Gel, chrome, 3D art and long-lasting manicures & pedicures.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
    from: 699,
  },
  {
    id: 'spa',
    name: 'Body Spa & Massage',
    icon: 'Flower2',
    blurb: 'Aromatherapy, deep-tissue and de-tan body treatments in private suites.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    from: 1599,
  },
  {
    id: 'threading',
    name: 'Threading & Waxing',
    icon: 'Wand2',
    blurb: 'Precision threading and rica/chocolate waxing for a flawless finish.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
    from: 149,
  },
];

export const pricingTiers = [
  {
    category: 'Hair',
    plans: [
      { tier: 'Classic', price: 899, items: ['Haircut & blow-dry', 'Basic styling', 'Head massage'] },
      { tier: 'Signature', price: 2499, items: ['Global colour', 'Deep conditioning', 'Style consult'], featured: true },
      { tier: 'Luxe', price: 5999, items: ['Keratin smoothening', 'Olaplex treatment', 'Take-home care kit'] },
    ],
  },
  {
    category: 'Skin',
    plans: [
      { tier: 'Classic', price: 1299, items: ['Cleanup', 'Basic facial', 'Mask & massage'] },
      { tier: 'Signature', price: 2999, items: ['Brightening facial', 'Peel therapy', 'LED light therapy'], featured: true },
      { tier: 'Luxe', price: 5499, items: ['Anti-ageing facial', 'Gold radiance ritual', 'Under-eye therapy'] },
    ],
  },
  {
    category: 'Bridal',
    plans: [
      { tier: 'Engagement', price: 8999, items: ['HD makeup', 'Hairstyling', 'Draping'] },
      { tier: 'Wedding', price: 18999, items: ['Airbrush makeup', 'Trial session', 'Touch-up kit'], featured: true },
      { tier: 'Destination', price: 34999, items: ['3-look changes', 'On-site artist team', 'Family makeup add-on'] },
    ],
  },
];

export const gallery = [
  { id: 1, category: 'Bridal', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { id: 2, category: 'Hair', image: 'https://images.unsplash.com/photo-1522337094846-8a4a04437613?auto=format&fit=crop&w=800&q=80' },
  { id: 3, category: 'Nails', image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=800&q=80' },
  { id: 4, category: 'Skin', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80' },
  { id: 5, category: 'Makeup', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80' },
  { id: 6, category: 'Spa', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
  { id: 7, category: 'Hair', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80' },
  { id: 8, category: 'Bridal', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80' },
];

export const testimonials = [
  { id: 1, name: 'Ananya R.', service: 'Bridal Makeup', rating: 5, quote: 'My wedding look stayed flawless for 14 hours. The trial session made all the difference.' },
  { id: 2, name: 'Priya K.', service: 'Hair Colour', rating: 5, quote: 'Best balayage in Pune, hands down. The AI hairstyle tool actually matched what suited my face shape.' },
  { id: 3, name: 'Meera S.', service: 'Skin Facial', rating: 5, quote: 'The skin quiz recommended a facial I never would have picked myself — my skin has never looked better.' },
  { id: 4, name: 'Kavya D.', service: 'Nail Art', rating: 4, quote: 'Booked online in under a minute and got a WhatsApp reminder the morning of. So convenient.' },
  { id: 5, name: 'Ritu P.', service: 'Spa', rating: 5, quote: 'Private suite, calming music, and a therapist who actually listened to what I needed.' },
];

export const offers = [
  { id: 1, title: 'First Visit Glow', detail: '20% off any facial or hair service for new clients.', code: 'AURA20', endsInDays: 6 },
  { id: 2, title: 'Bridal Combo', detail: 'Book engagement + wedding makeup together and save ₹3,000.', code: 'BRIDECOMBO', endsInDays: 14 },
  { id: 3, title: 'Refer & Glow', detail: 'Refer a friend — you both get ₹500 off your next visit.', code: 'REFER500', endsInDays: 30 },
];

export const faceShapes = ['Oval', 'Round', 'Square', 'Heart', 'Long'];
export const hairLengths = ['Short', 'Medium', 'Long'];
export const occasions = ['Everyday', 'Party / Night out', 'Bridal / Wedding'];

// Simple deterministic rule engine — swap for a real ML model later
// without changing any component that calls recommendHairstyle().
export function recommendHairstyle({ faceShape, hairLength, occasion }) {
  const base = {
    Oval: 'Soft layers that frame the jaw beautifully — almost any style works for you.',
    Round: 'Long layers with side-swept volume to add length and definition.',
    Square: 'Soft waves or curtain bangs to soften strong jawlines.',
    Heart: 'Chin-length lobs or side-swept fringes to balance a narrower jaw.',
    Long: 'Blunt cuts or waves with volume at the sides to add width.',
  };
  const occasionStyle = {
    'Everyday': 'a low-maintenance everyday finish',
    'Party / Night out': 'glam curls or a sleek high pony for extra drama',
    'Bridal / Wedding': 'a structured bridal updo with fresh florals or a statement veil-set',
  };
  const lengthNote = {
    Short: 'Given your short length, we\u2019d shape it into a textured crop or bob.',
    Medium: 'Your medium length is perfect for layered lobs or soft shags.',
    Long: 'Your long hair gives us room for elaborate braids, curls or updos.',
  };
  return {
    headline: `${faceShape} face + ${hairLength.toLowerCase()} hair`,
    style: base[faceShape],
    lengthNote: lengthNote[hairLength],
    occasionNote: `For ${occasion.toLowerCase()}, we'd recommend ${occasionStyle[occasion]}.`,
    suggestedService: occasion === 'Bridal / Wedding' ? 'Bridal Hair & Makeup' : 'Signature Hair Styling',
  };
}

export const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive'];
export const skinConcerns = ['Acne & breakouts', 'Pigmentation', 'Fine lines & ageing', 'Dullness'];
export const skinGoals = ['Clear, calm skin', 'Even tone & brightness', 'Firmness & anti-ageing'];

// Rule engine for the skin quiz — swap for a real model/API later.
export function recommendSkincare({ skinType, concern, goal }) {
  const treatmentMap = {
    'Acne & breakouts': 'Deep-Cleanse Salicylic Facial',
    'Pigmentation': 'Brightening Vitamin-C Peel',
    'Fine lines & ageing': 'Collagen Boost Anti-Ageing Facial',
    'Dullness': 'Gold Radiance Ritual',
  };
  const routineTip = {
    Oily: 'a gel-based cleanser and oil-free SPF',
    Dry: 'a cream cleanser followed by a hydrating serum',
    Combination: 'zone-specific care — light gel on the T-zone, cream elsewhere',
    Sensitive: 'fragrance-free, minimal-ingredient products',
  };
  return {
    treatment: treatmentMap[concern],
    routineTip: routineTip[skinType],
    summary: `For ${skinType.toLowerCase()} skin focused on "${goal.toLowerCase()}", our estheticians recommend the ${treatmentMap[concern]}, paired with ${routineTip[skinType]} at home.`,
  };
}
