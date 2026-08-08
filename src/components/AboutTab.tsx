import React from 'react';
import { prayerMiniCards, featureGridData } from '../data/prayerData';
import { Clock, BookOpen, Calendar, HelpCircle, ExternalLink } from 'lucide-react';

export const AboutTab: React.FC = () => {
  const featureIcons = [
    <Clock className="w-5 h-5 text-[#0c2a32]" />,
    <BookOpen className="w-5 h-5 text-[#0c2a32]" />,
    <Calendar className="w-5 h-5 text-[#0c2a32]" />,
    <HelpCircle className="w-5 h-5 text-[#0c2a32]" />
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Page Hero */}
      <section className="max-w-3xl mx-auto text-center px-4 pt-6 space-y-3">
        <span className="inline-block text-[11px] uppercase tracking-widest text-[#cda355] border border-[#cda355]/30 rounded-full px-3 py-1 bg-[#123c46]/40">
          About this app
        </span>
        <h1 className="font-marcellus text-3xl sm:text-4xl text-[#e6cd94]">
          A quiet companion for your five daily prayers
        </h1>
        <p className="text-sm sm:text-base text-[#9fbfc2] max-w-2xl mx-auto leading-relaxed">
          Salah brings together accurate prayer times, a clear rakaat &amp; surah guide, and a bit of learning — all in one calm, uncluttered place.
        </p>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 space-y-8">
        {/* What is Salah Block */}
        <div className="bg-[#123c46] border border-[#cda355]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="font-marcellus text-2xl text-[#e6cd94]">What is Salah?</h2>
          <div className="space-y-3 text-sm text-[#f4efe1]/90 leading-relaxed font-outfit">
            <p>
              Salah (<span className="font-amiri text-base text-[#cda355]">الصلاة</span>) is the ritual prayer performed by Muslims five times a day — at dawn, midday, afternoon, sunset, and night. It is the second of the Five Pillars of Islam and structures the day around remembrance, regardless of how busy that day is.
            </p>
            <p>
              Each prayer has a fixed window of time, a set number of rakaats (units), and a simple recitation pattern. This app exists to make all three easy to check at a glance — accurate to your exact location, not a generic timetable.
            </p>
          </div>
        </div>

        {/* 5 Daily Prayers Mini Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {prayerMiniCards.map((p) => (
            <div
              key={p.name}
              className="bg-[#123c46] border border-[#cda355]/30 rounded-2xl p-5 text-center space-y-2 shadow-md hover:border-[#cda355] transition-colors"
            >
              <h3 className="font-marcellus text-lg text-[#f4efe1]">{p.name}</h3>
              <span className="font-amiri text-sm text-[#cda355] block">{p.ar}</span>
              <p className="text-xs text-[#9fbfc2] leading-relaxed font-outfit">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* What's Inside Feature Grid */}
        <div className="bg-[#123c46] border border-[#cda355]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="font-marcellus text-2xl text-[#e6cd94]">What's inside</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featureGridData.map((f, i) => (
              <div
                key={i}
                className="bg-[#164854] border border-[#cda355]/25 rounded-2xl p-5 space-y-2.5"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e6cd94] to-[#cda355] flex items-center justify-center shadow-md">
                  {featureIcons[i]}
                </div>
                <h3 className="font-marcellus text-lg text-[#f4efe1]">{f.title}</h3>
                <p className="text-xs text-[#9fbfc2] leading-relaxed font-outfit">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sources & Notes */}
        <div className="bg-[#123c46] border border-[#cda355]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="font-marcellus text-2xl text-[#e6cd94]">Sources &amp; notes</h2>
          <div className="space-y-3 text-sm text-[#f4efe1]/90 leading-relaxed font-outfit">
            <p>
              Prayer times are calculated by the{' '}
              <a
                href="https://aladhan.com/prayer-times-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e6cd94] underline hover:text-[#cda355] inline-flex items-center gap-1"
              >
                Aladhan API <ExternalLink className="w-3 h-3" />
              </a>{' '}
              using the ISNA calculation method. Rakaat structure and surah suggestions follow commonly taught Sunni practice.
            </p>
            <p>
              Minor differences exist between schools of thought (madhāhib) — for example, around optional sunnah units for Asr and Isha. If you follow a specific school, use its guidance for anything beyond the obligatory (Fard) rakaats.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
