import React from 'react';
import { prayerMeta } from '../data/prayerData';

interface PrayerCardProps {
  name: string;
  time: string;
  isCurrent: boolean;
  onClick: () => void;
  index: number;
}

export const PrayerCard: React.FC<PrayerCardProps> = ({
  name,
  time,
  isCurrent,
  onClick,
  index
}) => {
  const meta = prayerMeta[name] || { arabic: '', rakaatLabel: '' };
  const cleanTime = time ? time.split(' ')[0] : '--:--';

  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${index * 0.08}s` }}
      className={`group relative bg-[#123c46] border transition-all duration-300 cursor-pointer text-center p-6 sm:p-7 pt-9 rounded-t-[80px] rounded-b-2xl shadow-lg hover:-translate-y-1.5 hover:shadow-2xl ${
        isCurrent
          ? 'border-[#cda355] shadow-[#cda355]/20 ring-1 ring-[#cda355]'
          : 'border-[#cda355]/30 hover:border-[#cda355]'
      }`}
    >
      {/* Top Arch Sun Accent */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-br from-[#e6cd94] to-[#cda355] opacity-90 shadow-md flex items-center justify-center text-[#0c2a32] group-hover:scale-110 transition-transform">
        <div className="w-2.5 h-2.5 rounded-full bg-[#0c2a32]/20" />
      </div>

      {/* Active "NOW" Badge */}
      {isCurrent && (
        <span className="absolute top-3 right-4 text-[10px] uppercase font-semibold tracking-widest text-[#e6cd94] bg-[#164854] px-2 py-0.5 rounded-full border border-[#cda355]/40 animate-pulse">
          NOW
        </span>
      )}

      {/* Prayer Name & Arabic */}
      <h3 className="font-marcellus text-xl text-[#f4efe1] mt-3 group-hover:text-[#e6cd94] transition-colors">
        {name}
      </h3>
      <span className="font-amiri text-lg text-[#cda355] block my-1">
        {meta.arabic}
      </span>

      {/* Time */}
      <div className="text-2xl font-semibold text-[#e6cd94] tracking-wide my-2 font-mono">
        {cleanTime}
      </div>

      {/* Rakaat summary */}
      <p className="text-xs text-[#9fbfc2] font-outfit mt-2 tracking-tight line-clamp-1 group-hover:text-[#f4efe1] transition-colors">
        {meta.rakaatLabel}
      </p>
    </div>
  );
};
