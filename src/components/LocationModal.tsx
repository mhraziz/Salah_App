import React, { useState } from 'react';
import { MapPin, Navigation, X } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetCity: (city: string, country: string) => void;
  onUseGeolocation: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSetCity,
  onUseGeolocation
}) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || !country.trim()) {
      setError('Please enter both city and country.');
      return;
    }
    setError('');
    onSetCity(city.trim(), country.trim());
    onClose();
  };

  const handleGeo = () => {
    setError('');
    onUseGeolocation();
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#061418]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#123c46] border border-[#cda355] rounded-3xl max-w-sm w-full p-6 sm:p-7 relative shadow-2xl text-center space-y-5"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9fbfc2] hover:text-[#e6cd94] p-1 rounded-full"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-[#164854] border border-[#cda355]/40 flex items-center justify-center text-[#e6cd94] mx-auto">
          <MapPin className="w-6 h-6" />
        </div>

        <div>
          <h3 className="font-marcellus text-2xl text-[#e6cd94]">Set your location</h3>
          <p className="text-xs text-[#9fbfc2] mt-1">Get precise prayer times for your city</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <div>
            <label className="block text-xs text-[#9fbfc2] mb-1 font-medium">City</label>
            <input
              type="text"
              placeholder="e.g. Karachi, London, Chicago"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a2229] border border-[#cda355]/30 text-[#f4efe1] placeholder-[#9fbfc2]/50 text-sm focus:outline-none focus:border-[#cda355]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#9fbfc2] mb-1 font-medium">Country</label>
            <input
              type="text"
              placeholder="e.g. Pakistan, UK, USA"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a2229] border border-[#cda355]/30 text-[#f4efe1] placeholder-[#9fbfc2]/50 text-sm focus:outline-none focus:border-[#cda355]"
            />
          </div>

          {error && <p className="text-xs text-[#e08a8a] text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#cda355] text-[#0c2a32] font-semibold text-sm hover:bg-[#e6cd94] transition-colors shadow-md mt-2 cursor-pointer"
          >
            Get Prayer Times
          </button>
        </form>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-[#cda355]/20 w-full" />
          <span className="bg-[#123c46] px-3 text-[11px] text-[#9fbfc2] uppercase tracking-wider">or</span>
        </div>

        <button
          type="button"
          onClick={handleGeo}
          className="w-full py-2.5 px-4 rounded-xl border border-[#cda355]/40 text-[#e6cd94] font-medium text-sm hover:bg-[#164854] transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Navigation className="w-4 h-4" />
          Use my current location
        </button>
      </div>
    </div>
  );
};
