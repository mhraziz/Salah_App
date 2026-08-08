import React from 'react';
import { prayerMeta, prayerDetails } from '../data/prayerData';
import { X, Sparkles, BookOpen } from 'lucide-react';

interface PrayerDetailModalProps {
  prayerName: string | null;
  onClose: () => void;
}

export const PrayerDetailModal: React.FC<PrayerDetailModalProps> = ({
  prayerName,
  onClose
}) => {
  if (!prayerName) return null;

  const meta = prayerMeta[prayerName] || { arabic: '', rakaatLabel: '' };
  const segments = prayerDetails[prayerName] || [];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#061418]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-[#164854] to-[#123c46] border border-[#cda355] rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-5"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9fbfc2] hover:text-[#e6cd94] p-1.5 rounded-full hover:bg-[#123c46] transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#cda355]/30 pb-4 pr-8">
          <div className="flex items-center gap-2 text-[#cda355] text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rakaat &amp; Surah Breakdown</span>
          </div>
          <h2 className="font-marcellus text-3xl text-[#e6cd94] flex items-center gap-3">
            {prayerName}
            <span className="font-amiri text-2xl text-[#cda355]">{meta.arabic}</span>
          </h2>
          <p className="text-sm text-[#9fbfc2] mt-1 font-outfit">{meta.rakaatLabel}</p>
        </div>

        {/* Prayer Segments */}
        <div className="space-y-4">
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className="bg-[#0a2229]/60 border border-[#cda355]/25 rounded-2xl p-4 sm:p-5 space-y-3"
            >
              <div className="flex justify-between items-baseline border-b border-[#cda355]/20 pb-2">
                <span className="font-marcellus text-lg text-[#e6cd94] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#cda355]" />
                  {seg.type}
                </span>
                <span className="text-xs text-[#9fbfc2] font-semibold bg-[#164854] px-2.5 py-1 rounded-full border border-[#cda355]/30">
                  {seg.count} {seg.count === 1 ? 'rakaat' : 'rakaats'}
                </span>
              </div>

              <div className="space-y-2 text-sm text-[#f4efe1]/90">
                {seg.rows.map((r) => (
                  <div key={r.rakaat} className="flex gap-2 text-sm leading-relaxed">
                    <span className="font-bold text-[#e6cd94] whitespace-nowrap min-w-[75px]">
                      Rakaat {r.rakaat}:
                    </span>
                    <span className="text-[#f4efe1]/90">{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="bg-[#123c46]/80 border border-[#cda355]/20 rounded-xl p-3.5 text-xs text-[#9fbfc2] leading-relaxed">
          <p>
            <strong className="text-[#e6cd94]">Note:</strong> Only the Fard (obligatory) portion is required for the prayer to be valid; Sunnah and Witr units are strongly recommended practices of the Prophet ﷺ. Surah choices beyond Al-Fatiha are recommendations for ease of memorization — any surah may be recited.
          </p>
        </div>
      </div>
    </div>
  );
};
