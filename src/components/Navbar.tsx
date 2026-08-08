import React, { useState } from 'react';
import { TabType } from '../types';
import { Menu, X, Compass } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'prayer-times', label: 'Prayer Times' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'about', label: 'About' },
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0a2229]/85 backdrop-blur-md border-b border-[#cda355]/25 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e6cd94] to-[#cda355] flex items-center justify-center text-[#0c2a32] shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-marcellus text-xl sm:text-2xl text-[#e6cd94] tracking-wide">
            Salah <span className="font-amiri text-lg text-[#cda355] ml-1">الصلاة</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative py-2 text-sm font-outfit tracking-wide transition-colors cursor-pointer focus:outline-none ${
                  isActive ? 'text-[#e6cd94] font-medium' : 'text-[#9fbfc2] hover:text-[#e6cd94]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#cda355] to-[#e6cd94] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#e6cd94] hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#123c46] border-b border-[#cda355]/30 px-4 pt-2 pb-4 shadow-xl space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-outfit text-sm transition-all ${
                  isActive
                    ? 'bg-[#164854] text-[#e6cd94] font-semibold border border-[#cda355]/40'
                    : 'text-[#9fbfc2] hover:bg-[#164854]/50 hover:text-[#f4efe1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
