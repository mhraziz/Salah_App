import React from 'react';
import { TabType } from '../types';
import { ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  activeTab: TabType;
}

export const Footer: React.FC<FooterProps> = ({ activeTab }) => {
  return (
    <footer className="mt-auto py-8 text-center text-xs text-[#9fbfc2]/80 border-t border-[#cda355]/20 px-4 space-y-2 font-outfit">
      {activeTab === 'quiz' ? (
        <p>Questions cover widely-agreed, foundational facts about Islam.</p>
      ) : activeTab === 'about' ? (
        <p className="flex items-center justify-center gap-1.5 text-[#e6cd94]">
          Built with care, for five quiet moments a day.
        </p>
      ) : (
        <p className="max-w-xl mx-auto leading-relaxed">
          Prayer times courtesy of the{' '}
          <a
            href="https://aladhan.com/prayer-times-api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e6cd94] underline hover:text-[#cda355] inline-flex items-center gap-0.5"
          >
            Aladhan API <ExternalLink className="w-2.5 h-2.5" />
          </a>
          . Rakaat structure and surah suggestions follow commonly taught Sunni practice — minor variations exist between schools of thought (madhāhib).
        </p>
      )}
    </footer>
  );
};
