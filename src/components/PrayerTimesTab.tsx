import React from 'react';
import { WeekDayTiming, LocationState } from '../types';
import { MapPin, Calendar, Sparkles } from 'lucide-react';

interface PrayerTimesTabProps {
  weekSchedule: WeekDayTiming[];
  locationState: LocationState;
  hijriDateStr: string;
  onOpenLocationModal: () => void;
  loading: boolean;
  error: string | null;
}

export const PrayerTimesTab: React.FC<PrayerTimesTabProps> = ({
  weekSchedule,
  locationState,
  hijriDateStr,
  onOpenLocationModal,
  loading,
  error
}) => {
  const prayerCols = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center px-4 pt-6 space-y-3">
        <span className="inline-block text-[11px] uppercase tracking-widest text-[#cda355] border border-[#cda355]/30 rounded-full px-3 py-1 bg-[#123c46]/40">
          Full Schedule
        </span>
        <h1 className="font-marcellus text-3xl sm:text-4xl text-[#e6cd94]">
          This week's prayer times
        </h1>
        <p className="text-sm text-[#9fbfc2] max-w-xl mx-auto leading-relaxed">
          Based on your current location. Today is highlighted, and the Hijri date is shown below.
        </p>

        {/* Location Control */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-[#123c46] border border-[#cda355]/30 px-4 py-1.5 rounded-full text-xs text-[#9fbfc2]">
            <MapPin className="w-3.5 h-3.5 text-[#cda355]" />
            <span>{locationState.label}</span>
            <button
              onClick={onOpenLocationModal}
              className="ml-2 text-[#e6cd94] hover:underline font-semibold cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>

        {/* Hijri Banner */}
        {hijriDateStr && (
          <p className="font-amiri text-lg text-[#e6cd94] tracking-wide pt-1">
            {hijriDateStr}
          </p>
        )}
      </section>

      {/* Week Schedule Table */}
      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-[#123c46] border border-[#cda355]/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#164854] border-b border-[#cda355]/30 text-xs font-marcellus text-[#e6cd94] tracking-wider uppercase">
                  <th className="py-4 px-6">Date</th>
                  {prayerCols.map((col) => (
                    <th key={col} className="py-4 px-4 text-center">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cda355]/15 text-sm text-[#f4efe1]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-[#9fbfc2] animate-pulse">
                      Fetching this week's times…
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-[#e08a8a]">
                      {error}
                    </td>
                  </tr>
                ) : (
                  weekSchedule.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        row.isToday
                          ? 'bg-[#cda355]/15 font-medium border-l-4 border-l-[#cda355]'
                          : 'hover:bg-[#164854]/40'
                      }`}
                    >
                      <td className="py-3.5 px-6 whitespace-nowrap text-xs sm:text-sm">
                        {row.isToday ? (
                          <span className="flex items-center gap-1.5 text-[#e6cd94] font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-[#cda355]" />
                            Today
                          </span>
                        ) : (
                          <span className="text-[#9fbfc2]">{row.dateStr}</span>
                        )}
                      </td>
                      {prayerCols.map((col) => {
                        const rawTime = row.timings[col] || '--:--';
                        const timeClean = rawTime.split(' ')[0];
                        return (
                          <td
                            key={col}
                            className={`py-3.5 px-4 text-center font-mono whitespace-nowrap text-xs sm:text-sm ${
                              row.isToday ? 'text-[#e6cd94] font-semibold' : 'text-[#f4efe1]/90'
                            }`}
                          >
                            {timeClean}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
