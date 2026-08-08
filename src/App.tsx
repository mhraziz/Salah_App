import React, { useState, useEffect, useCallback } from 'react';
import { TabType, Timings, LocationState, WeekDayTiming } from './types';
import { prayerOrder } from './data/prayerData';
import { Navbar } from './components/Navbar';
import { HomeTab } from './components/HomeTab';
import { PrayerTimesTab } from './components/PrayerTimesTab';
import { QuizTab } from './components/QuizTab';
import { AboutTab } from './components/AboutTab';
import { Footer } from './components/Footer';
import { PrayerDetailModal } from './components/PrayerDetailModal';
import { LocationModal } from './components/LocationModal';

function toMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.split(' ')[0];
  const [h, m] = clean.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function parseGregorian(dateStr: string): Date {
  // Format: "25-07-2026"
  const [d, m, y] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [locationState, setLocationState] = useState<LocationState>({
    mode: 'coords',
    label: 'Locating…'
  });

  const [timings, setTimings] = useState<Timings | null>(null);
  const [weekSchedule, setWeekSchedule] = useState<WeekDayTiming[]>([]);
  const [hijriDateStr, setHijriDateStr] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [nextPrayer, setNextPrayer] = useState<{ name: string; isTomorrow: boolean } | null>(null);
  const [countdown, setCountdown] = useState<string>('00:00:00');
  const [currentPrayerIndex, setCurrentPrayerIndex] = useState<number>(-1);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [selectedPrayerDetail, setSelectedPrayerDetail] = useState<string | null>(null);

  // Fetch today's timings
  const fetchTodayTimings = useCallback(async (loc: LocationState) => {
    setLoading(true);
    setError(null);

    try {
      let url = '';
      if (loc.mode === 'coords' && loc.lat !== undefined && loc.lon !== undefined) {
        const ts = Math.floor(Date.now() / 1000);
        url = `https://api.aladhan.com/v1/timings/${ts}?latitude=${loc.lat}&longitude=${loc.lon}&method=2`;
      } else if (loc.mode === 'city' && loc.city && loc.country) {
        url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
          loc.city
        )}&country=${encodeURIComponent(loc.country)}&method=2`;
      } else {
        throw new Error('Invalid location parameters');
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.code !== 200) {
        throw new Error(data.message || 'Could not fetch timings');
      }

      const fetchedTimings: Timings = data.data.timings;
      setTimings(fetchedTimings);

      let label = loc.label;
      if (loc.mode === 'coords' && data.data.meta?.timezone) {
        label = data.data.meta.timezone.split('/').pop()?.replace(/_/g, ' ') || 'Current location';
      } else if (loc.mode === 'city') {
        label = `${loc.city}, ${loc.country}`;
      }

      setLocationState((prev) => ({ ...prev, label }));
    } catch (err: any) {
      console.error(err);
      setError('Could not fetch prayer times. Please check location.');
      setLocationState((prev) => ({ ...prev, label: 'Location error' }));
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch 7-day calendar
  const fetchWeekSchedule = useCallback(async (loc: LocationState) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const y = today.getFullYear();
      const m = today.getMonth() + 1;

      const fetchMonthData = async (year: number, month: number) => {
        const url =
          loc.mode === 'coords' && loc.lat !== undefined && loc.lon !== undefined
            ? `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${loc.lat}&longitude=${loc.lon}&method=2`
            : `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(
                loc.city || ''
              )}&country=${encodeURIComponent(loc.country || '')}&method=2`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.code !== 200) throw new Error('Calendar fetch failed');
        return data.data;
      };

      let entries = await fetchMonthData(y, m);

      const daysInMonth = new Date(y, m, 0).getDate();
      if (today.getDate() + 6 > daysInMonth) {
        const nextM = m === 12 ? 1 : m + 1;
        const nextY = m === 12 ? y + 1 : y;
        const nextEntries = await fetchMonthData(nextY, nextM);
        entries = entries.concat(nextEntries);
      }

      const weekEnd = new Date(today);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const filtered = entries
        .filter((e: any) => {
          const d = parseGregorian(e.date.gregorian.date);
          return d >= today && d <= weekEnd;
        })
        .sort(
          (a: any, b: any) =>
            parseGregorian(a.date.gregorian.date).getTime() -
            parseGregorian(b.date.gregorian.date).getTime()
        );

      const weekData: WeekDayTiming[] = filtered.slice(0, 7).map((entry: any) => {
        const d = parseGregorian(entry.date.gregorian.date);
        const isToday = sameDay(d, today);
        const label = isToday
          ? 'Today'
          : d.toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            });

        return {
          dateStr: label,
          rawDate: entry.date.gregorian.date,
          isToday,
          timings: entry.timings,
          hijri: entry.date.hijri
            ? {
                day: entry.date.hijri.day,
                monthEn: entry.date.hijri.month.en,
                year: entry.date.hijri.year
              }
            : undefined
        };
      });

      setWeekSchedule(weekData);

      const todayEntry = weekData.find((w) => w.isToday) || weekData[0];
      if (todayEntry && todayEntry.hijri) {
        setHijriDateStr(
          `${todayEntry.hijri.day} ${todayEntry.hijri.monthEn} ${todayEntry.hijri.year} AH`
        );
      }
    } catch (err) {
      console.error('Week schedule fetch error:', err);
    }
  }, []);

  // Update next prayer & countdown timer
  const updateTimer = useCallback(() => {
    if (!timings) return;

    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

    // Determine current prayer period index
    let currentIdx = -1;
    const mins = prayerOrder.map((p) => toMinutes(timings[p]));
    for (let i = 0; i < mins.length; i++) {
      if (nowMin >= mins[i]) currentIdx = i;
    }
    setCurrentPrayerIndex(currentIdx);

    // Determine next prayer
    let nextP: string | null = null;
    let nextM: number | null = null;
    let isTomorrow = false;

    for (const p of prayerOrder) {
      const m = toMinutes(timings[p]);
      if (m > nowMin) {
        nextP = p;
        nextM = m;
        break;
      }
    }

    if (!nextP) {
      nextP = 'Fajr';
      nextM = toMinutes(timings['Fajr']) + 24 * 60;
      isTomorrow = true;
    }

    setNextPrayer({ name: nextP, isTomorrow });

    const diffMin = nextM - nowMin;
    const totalSec = Math.max(0, Math.round(diffMin * 60));
    const hh = Math.floor(totalSec / 3600);
    const mm = Math.floor((totalSec % 3600) / 60);
    const ss = totalSec % 60;

    setCountdown(
      `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
    );
  }, [timings]);

  // Geolocation trigger
  const tryGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationState({ mode: 'coords', label: 'Geolocation unavailable' });
      setIsLocationModalOpen(true);
      return;
    }

    setLocationState({ mode: 'coords', label: 'Locating…' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newLoc: LocationState = {
          mode: 'coords',
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: 'Current location'
        };
        setLocationState(newLoc);
        fetchTodayTimings(newLoc);
        fetchWeekSchedule(newLoc);
      },
      (err) => {
        console.warn('Geolocation denied or failed:', err);
        setLocationState({ mode: 'coords', label: 'Location denied — set manually' });
        setIsLocationModalOpen(true);
      },
      { timeout: 8000 }
    );
  }, [fetchTodayTimings, fetchWeekSchedule]);

  // Init
  useEffect(() => {
    tryGeolocation();
  }, [tryGeolocation]);

  // Interval timer loop
  useEffect(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [updateTimer]);

  // Location Handlers
  const handleSetCity = (city: string, country: string) => {
    const newLoc: LocationState = {
      mode: 'city',
      city,
      country,
      label: `${city}, ${country}`
    };
    setLocationState(newLoc);
    fetchTodayTimings(newLoc);
    fetchWeekSchedule(newLoc);
  };

  return (
    <div className="min-h-screen flex flex-col relative text-[#f4efe1] selection:bg-[#cda355]/30">
      {/* Background pattern */}
      <div className="pattern-overlay" />

      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab View */}
      <div className="flex-1">
        {activeTab === 'home' && (
          <HomeTab
            timings={timings}
            locationState={locationState}
            nextPrayer={nextPrayer}
            countdown={countdown}
            currentPrayerIndex={currentPrayerIndex}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onSelectPrayer={(name) => setSelectedPrayerDetail(name)}
            loading={loading}
            error={error}
          />
        )}

        {activeTab === 'prayer-times' && (
          <PrayerTimesTab
            weekSchedule={weekSchedule}
            locationState={locationState}
            hijriDateStr={hijriDateStr}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            loading={loading}
            error={error}
          />
        )}

        {activeTab === 'quiz' && <QuizTab />}

        {activeTab === 'about' && <AboutTab />}
      </div>

      {/* Footer */}
      <Footer activeTab={activeTab} />

      {/* Modals */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSetCity={handleSetCity}
        onUseGeolocation={tryGeolocation}
      />

      <PrayerDetailModal
        prayerName={selectedPrayerDetail}
        onClose={() => setSelectedPrayerDetail(null)}
      />
    </div>
  );
}
