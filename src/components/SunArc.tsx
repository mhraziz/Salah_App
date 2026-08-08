import React, { useRef, useEffect, useState } from 'react';
import { Timings } from '../types';
import { prayerOrder } from '../data/prayerData';

interface SunArcProps {
  timings: Timings | null;
}

function toMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.split(' ')[0];
  const [h, m] = clean.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export const SunArc: React.FC<SunArcProps> = ({ timings }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [markerCoords, setMarkerCoords] = useState<{ name: string; x: number; y: number; active: boolean }[]>([]);
  const [sunCoord, setSunCoord] = useState<{ x: number; y: number }>({ x: 20, y: 190 });

  useEffect(() => {
    if (!timings || !pathRef.current) return;

    const path = pathRef.current;
    const totalLen = path.getTotalLength();

    const domainStart = toMinutes(timings.Fajr) - 40;
    const domainEnd = toMinutes(timings.Isha) + 60;
    const span = Math.max(1, domainEnd - domainStart);

    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

    // Position prayer markers
    const coords = prayerOrder.map((name) => {
      const m = toMinutes(timings[name]);
      let frac = (m - domainStart) / span;
      frac = Math.min(1, Math.max(0, frac));
      const pt = path.getPointAtLength(frac * totalLen);

      // Check if current prayer or active
      const active = Math.abs(m - nowMin) < 30;

      return {
        name,
        x: pt.x,
        y: pt.y,
        active
      };
    });

    setMarkerCoords(coords);

    // Position sun dot
    let sunFrac = (nowMin - domainStart) / span;
    sunFrac = Math.min(1, Math.max(0, sunFrac));
    const sunPt = path.getPointAtLength(sunFrac * totalLen);
    setSunCoord({ x: sunPt.x, y: sunPt.y });
  }, [timings]);

  return (
    <div className="relative max-w-xl mx-auto my-4 px-2">
      <svg viewBox="0 0 600 210" className="w-full h-auto overflow-visible">
        {/* Arc Path */}
        <path
          ref={pathRef}
          d="M 20 190 A 280 280 0 0 1 580 190"
          fill="none"
          stroke="rgba(205,163,85,0.35)"
          strokeWidth="2"
          strokeDasharray="4 6"
        />

        {/* Prayer Markers */}
        {markerCoords.map((m) => (
          <g key={m.name} className="transition-all duration-300">
            <circle
              cx={m.x}
              cy={m.y}
              r={m.active ? 7 : 5}
              fill={m.active ? '#cda355' : '#0a2229'}
              stroke={m.active ? '#e6cd94' : '#cda355'}
              strokeWidth={m.active ? '3' : '2'}
            />
            <text
              x={m.x}
              y={m.y - 14}
              textAnchor="middle"
              className={`text-[12px] font-outfit tracking-wide transition-colors ${
                m.active ? 'fill-[#e6cd94] font-semibold' : 'fill-[#9fbfc2]'
              }`}
            >
              {m.name}
            </text>
          </g>
        ))}

        {/* Sun Dot */}
        <circle
          cx={sunCoord.x}
          cy={sunCoord.y}
          r="8"
          fill="#e6cd94"
          className="transition-all duration-500 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(230,205,148,0.95))'
          }}
        />
      </svg>
    </div>
  );
};
