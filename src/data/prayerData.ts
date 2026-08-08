import { PrayerMeta, PrayerSegment, HowToPrayStep, QuizQuestion, RakaatRow } from '../types';

export const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

export const prayerMeta: Record<string, PrayerMeta> = {
  Fajr: { arabic: 'الفجر', rakaatLabel: '2 Sunnah + 2 Fard' },
  Dhuhr: { arabic: 'الظهر', rakaatLabel: '4 Sunnah + 4 Fard + 2 Sunnah' },
  Asr: { arabic: 'العصر', rakaatLabel: '4 Fard' },
  Maghrib: { arabic: 'المغرب', rakaatLabel: '3 Fard + 2 Sunnah' },
  Isha: { arabic: 'العشاء', rakaatLabel: '4 Fard + 2 Sunnah + 3 Witr' }
};

export const shortSurahs = [
  'Al-Ikhlas',
  'Al-Kausar',
  'An-Nasr',
  'Al-Asr',
  'Al-Fil',
  'Al-Falaq',
  'An-Nas',
  'Al-Qadr',
  'Al-Ma\'un'
];

export function rakaatDetail(n: number): RakaatRow[] {
  const rows: RakaatRow[] = [];
  for (let i = 1; i <= n; i++) {
    if (i <= 2) {
      rows.push({
        rakaat: i,
        text: `Surah Al-Fatiha, then a short surah (e.g. ${shortSurahs[(i - 1) % shortSurahs.length]})`
      });
    } else {
      rows.push({
        rakaat: i,
        text: 'Surah Al-Fatiha only'
      });
    }
  }
  return rows;
}

export const prayerDetails: Record<string, PrayerSegment[]> = {
  Fajr: [
    { type: 'Sunnah (Mu’akkadah)', count: 2, rows: rakaatDetail(2) },
    { type: 'Fard', count: 2, rows: rakaatDetail(2) }
  ],
  Dhuhr: [
    { type: 'Sunnah (before)', count: 4, rows: rakaatDetail(4) },
    { type: 'Fard', count: 4, rows: rakaatDetail(4) },
    { type: 'Sunnah (after)', count: 2, rows: rakaatDetail(2) }
  ],
  Asr: [
    { type: 'Fard', count: 4, rows: rakaatDetail(4) }
  ],
  Maghrib: [
    { type: 'Fard', count: 3, rows: rakaatDetail(3) },
    { type: 'Sunnah (after)', count: 2, rows: rakaatDetail(2) }
  ],
  Isha: [
    { type: 'Fard', count: 4, rows: rakaatDetail(4) },
    { type: 'Sunnah (after)', count: 2, rows: rakaatDetail(2) },
    { type: 'Witr', count: 3, rows: rakaatDetail(3) }
  ]
};

export const howToPraySteps: HowToPrayStep[] = [
  { title: 'Make the intention (Niyyah)', desc: 'Silently intend in your heart which prayer you are performing, facing the Qiblah.' },
  { title: 'Say the opening Takbir', desc: 'Raise both hands to shoulder/ear level and say "Allahu Akbar", then fold your hands and stand (Qiyam).' },
  { title: 'Recite in Qiyam', desc: 'Recite Surah Al-Fatiha, then (in the first two rakaats) a short additional surah.' },
  { title: 'Go into Ruku (bowing)', desc: 'Say "Allahu Akbar", bow with your back straight and hands on your knees, reciting "Subhana Rabbiyal Azeem" three times.' },
  { title: 'Rise back to standing', desc: 'Say "Sami’ Allahu liman hamidah" while rising, then "Rabbana lakal hamd" once upright.' },
  { title: 'First Sujood (prostration)', desc: 'Say "Allahu Akbar" and prostrate with forehead, nose, palms, knees and toes touching the ground, reciting "Subhana Rabbiyal A’la" three times.' },
  { title: 'Sit briefly, then prostrate again', desc: 'Rise to a brief sitting position, then perform a second Sujood the same way. This completes one rakaat.' },
  { title: 'Repeat for remaining rakaats', desc: 'Stand again for the next rakaat and repeat the recitation, Ruku and Sujood sequence.' },
  { title: 'Sit for Tashahhud', desc: 'After the 2nd rakaat (and the final rakaat), sit and recite the Tashahhud; in the final sitting, also recite Durood and closing supplications.' },
  { title: 'End with Salam', desc: 'Turn your head to the right saying "Assalamu Alaikum wa Rahmatullah", then to the left, repeating the same — this ends the prayer.' }
];

export const questionBank: QuizQuestion[] = [
  {
    q: 'How many times a day do Muslims perform the obligatory prayers?',
    options: ['Three', 'Four', 'Five', 'Six'],
    correct: 2
  },
  {
    q: 'Which of these is NOT one of the Five Pillars of Islam?',
    options: ['Shahada (declaration of faith)', 'Zakat (charity)', 'Hajj (pilgrimage)', 'Meditation'],
    correct: 3
  },
  {
    q: 'What is the holy book of Islam called?',
    options: ['The Torah', 'The Quran', 'The Psalms', 'The Gospel'],
    correct: 1
  },
  {
    q: 'During which month do Muslims fast from dawn to sunset?',
    options: ['Shawwal', 'Muharram', 'Ramadan', 'Rajab'],
    correct: 2
  },
  {
    q: 'What is the name of the dawn prayer?',
    options: ['Isha', 'Fajr', 'Asr', 'Maghrib'],
    correct: 1
  },
  {
    q: 'Towards which city do Muslims face while praying?',
    options: ['Medina', 'Jerusalem', 'Mecca', 'Baghdad'],
    correct: 2
  },
  {
    q: 'What is the Arabic term for the pilgrimage to Mecca?',
    options: ['Hajj', 'Umrah', 'Sawm', 'Zakat'],
    correct: 0
  },
  {
    q: 'Who is regarded as the final prophet in Islam?',
    options: ['Prophet Musa (Moses)', 'Prophet Isa (Jesus)', 'Prophet Ibrahim (Abraham)', 'Prophet Muhammad (peace be upon him)'],
    correct: 3
  },
  {
    q: 'What is the Islamic declaration of faith called?',
    options: ['Shahada', 'Salah', 'Zakat', 'Sawm'],
    correct: 0
  },
  {
    q: 'How many surahs (chapters) are there in the Quran?',
    options: ['99', '114', '120', '150'],
    correct: 1
  },
  {
    q: 'What is the name of the obligatory charitable giving in Islam?',
    options: ['Sadaqah', 'Zakat', 'Waqf', 'Fitrah'],
    correct: 1
  },
  {
    q: 'What is the name of the cube-shaped structure at the center of the Masjid al-Haram in Mecca?',
    options: ['The Dome of the Rock', 'The Kaaba', 'The Mihrab', 'The Minbar'],
    correct: 1
  }
];

export const prayerMiniCards = [
  { name: 'Fajr', ar: 'الفجر', desc: 'Before sunrise. Opens the day in stillness, before the world gets loud.' },
  { name: 'Dhuhr', ar: 'الظهر', desc: 'Just after midday. A short pause at the peak of the day\'s work.' },
  { name: 'Asr', ar: 'العصر', desc: 'Mid-to-late afternoon, as the light begins to lean and soften.' },
  { name: 'Maghrib', ar: 'المغرب', desc: 'Right after sunset. A brief window — the day exhaling.' },
  { name: 'Isha', ar: 'العشاء', desc: 'Night prayer. Closing the day the same way it opened.' }
];

export const featureGridData = [
  {
    title: 'Live Prayer Times',
    desc: 'Pulled from the Aladhan API using your exact location, so times are correct for wherever you are — not just your city in general.'
  },
  {
    title: 'Rakaat & Surah Guide',
    desc: 'Tap any prayer to see its Sunnah, Fard, and Witr breakdown, rakaat by rakaat, with suggested short surahs.'
  },
  {
    title: 'Weekly Forecast',
    desc: 'A full week of prayer times at once, with the Hijri date, so you can plan a few days ahead.'
  },
  {
    title: 'Islamic Quiz',
    desc: 'A short, friendly quiz on the basics of Islam — a light way to learn or refresh what you already know.'
  }
];
