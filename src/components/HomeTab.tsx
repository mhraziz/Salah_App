import React from 'react';
import { Timings, LocationState } from '../types';
import { prayerOrder, howToPraySteps } from '../data/prayerData';
import { SunArc } from './SunArc';
import { PrayerCard } from './PrayerCard';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';

interface HomeTabProps {
  timings: Timings | null;
  locationState: LocationState;
  nextPrayer: { name: string; isTomorrow: boolean } | null;
  countdown: string;
  currentPrayerIndex: number;
  onOpenLocationModal: () => void;
  onSelectPrayer: (name: string) => void;
  loading: boolean;
  error: string | null;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  timings,
  locationState,
  nextPrayer,
  countdown,
  currentPrayerIndex,
  onOpenLocationModal,
  onSelectPrayer,
  loading,
  error
}) => {
  const currentDateFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <header className="max-w-4xl mx-auto px-4 pt-6 text-center space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#123c46]/60 border border-[#cda355]/20 p-4 sm:px-6 rounded-2xl backdrop-blur-sm">
          <h1 className="font-marcellus text-2xl sm:text-3xl text-[#e6cd94] flex items-center gap-2">
            Salah <span className="font-amiri text-xl text-[#cda355]">الصلاة</span>
          </h1>

          {/* Location Control */}
          <div className="flex items-center gap-2 text-sm text-[#9fbfc2]">
            <MapPin className="w-4 h-4 text-[#cda355]" />
            <span className="truncate max-w-[200px]">{locationState.label}</span>
            <button
              onClick={onOpenLocationModal}
              className="ml-1 bg-transparent border border-[#cda355]/40 text-[#e6cd94] hover:bg-[#164854] hover:border-[#cda355] px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>

        {/* Date Display */}
        <p className="text-sm text-[#9fbfc2] tracking-wider font-outfit">
          {currentDateFormatted}
        </p>

        {/* Sun Arc SVG curve */}
        <SunArc timings={timings} />

        {/* Next Prayer Banner */}
        {nextPrayer && (
          <div className="max-w-md mx-auto bg-gradient-to-b from-[#164854] to-[#123c46] border border-[#cda355]/40 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xl">
            <div className="text-left">
              <span className="text-xs text-[#9fbfc2] font-medium block uppercase tracking-wider">
                Next —
              </span>
              <span className="font-marcellus text-xl text-[#e6cd94]">
                {nextPrayer.name} {nextPrayer.isTomorrow ? '(tomorrow)' : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#0a2229]/80 border border-[#cda355]/30 px-3.5 py-2 rounded-xl text-lg font-mono text-[#f4efe1] tracking-wider shadow-inner">
              <Clock className="w-4 h-4 text-[#cda355]" />
              <span>{countdown}</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Prayer Cards Grid */}
      <main className="max-w-5xl mx-auto px-4 space-y-12">
        <section>
          {loading ? (
            <div className="text-center text-[#9fbfc2] py-12 bg-[#123c46]/40 rounded-2xl border border-[#cda355]/20 animate-pulse">
              Fetching prayer times…
            </div>
          ) : error ? (
            <div className="text-center text-[#e08a8a] py-8 bg-[#123c46]/40 rounded-2xl border border-[#d17a7a]/40 space-y-3">
              <p>{error}</p>
              <button
                onClick={onOpenLocationModal}
                className="px-4 py-2 bg-[#cda355] text-[#0c2a32] font-semibold text-xs rounded-xl hover:bg-[#e6cd94]"
              >
                Set Location Manually
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {prayerOrder.map((name, i) => (
                <PrayerCard
                  key={name}
                  name={name}
                  time={timings ? timings[name] : '--:--'}
                  isCurrent={i === currentPrayerIndex}
                  onClick={() => onSelectPrayer(name)}
                  index={i}
                />
              ))}
            </div>
          )}
        </section>

        {/* How to Pray (Namaz) Guide */}
        <section className="bg-[#123c46] border border-[#cda355]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2 border-b border-[#cda355]/20 pb-5">
            <h2 className="font-marcellus text-2xl sm:text-3xl text-[#e6cd94]">
              How to Pray <span className="font-amiri text-xl text-[#cda355]">(Namaz)</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9fbfc2]">
              The general sequence for a two-rakaat unit — repeat as needed for prayers with more rakaats
            </p>
          </div>

          <ol className="divide-y divide-[#cda355]/20 space-y-0">
            {howToPraySteps.map((step, idx) => (
              <li key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full border border-[#cda355] text-[#e6cd94] font-marcellus text-sm flex items-center justify-center shrink-0 bg-[#164854] group-hover:scale-105 transition-transform shadow-sm">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-[#f4efe1] text-base group-hover:text-[#e6cd94] transition-colors flex items-center gap-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[#9fbfc2] leading-relaxed font-outfit">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
};
