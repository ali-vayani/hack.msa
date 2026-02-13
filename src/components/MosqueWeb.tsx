"use client";

import Image from 'next/image';

/* ───────── palette (matching page.tsx) ───────── */
const C = {
  // same palette as page.tsx for consistency
  skyTop: "#e8dfd4",
  skyMid: "#efe7dd",
  skyBot: "#f7f2ec",
  surface: "#fffdf9",
  ink: "#2d2218",
  coral: "#7a5a3d",
  gold: "#8a6545",
  goldFaint: "#a58263",
  border: "#ddcfbf",
};

/* ───────── Mosque Data ───────── */
const NUCLEUS = {
  id: "nueces",
  src: "/Nueces_Mosque.png",
  label: "Nueces Mosque (Nucleus)",
};

const GLOBAL_MOSQUES = [
  { id: "aqsa", src: "/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_01.jpg", label: "Al-Aqsa" },
  { id: "nabawi", src: "/Masjid_Nabawi_The_Prophet's_Mosque,_Madina.jpg", label: "Al-Masjid an-Nabawi" },
  { id: "kaaba", src: "/The_Door_of_the_Holy_Kaaba_(2025).jpg", label: "Kaaba" },
  { id: "sultan", src: "/Exterior_of_Sultan_Ahmed_I_Mosque_in_Istanbul,_Turkey_002.jpg", label: "Sultan Ahmed" },
  { id: "umayyad", src: "/Syria,_Damascus,_The_Umayyad_Mosque.jpg", label: "Umayyad Mosque" },
  { id: "azhar", src: "/Al-Azhar_Mosque_(8590203917).jpg", label: "Al-Azhar Mosque" },
  { id: "alhambra", src: "/Alhambra.png", label: "Alhambra" },
  { id: "hassan", src: "/Morroco.jpg", label: "Hassan II Mosque" },
];

/* ───────── Arabic Calligraphy Words (positioned on circular arc) ───────── */
// arc: 'top' → rotation = angle+90   |   arc: 'bottom' → rotation = angle-90
const CALLI_WORDS: { word: string; angle: number; arc: 'top' | 'bottom'; size: string }[] = [
  // ── Top-Right: بِسْمِ اللهِ  (right of top star point) ──
  { word: "بِسْمِ", angle: -25, arc: 'top', size: '1.3rem' },
  { word: "اللهِ", angle: -58, arc: 'top', size: '1.3rem' },

  // ── Top-Left: الرَّحْمَٰنِ الرَّحِيْمِ  (left of top star point) ──
  { word: "الرَّحْمَٰنِ", angle: -122, arc: 'top', size: '1.3rem' },
  { word: "الرَّحِيْمِ", angle: -155, arc: 'top', size: '1.3rem' },

  // ── Bottom-Right: إِنَّ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ  (right of bottom star point) ──
  { word: "إِنَّ", angle: 12, arc: 'bottom', size: '0.85rem' },
  { word: "فِى", angle: 25, arc: 'bottom', size: '0.85rem' },
  { word: "خَلْقِ", angle: 37, arc: 'bottom', size: '0.85rem' },
  { word: "ٱلسَّمَـٰوَٰتِ", angle: 55, arc: 'bottom', size: '0.85rem' },
  { word: "وَٱلْأَرْضِ", angle: 73, arc: 'bottom', size: '0.85rem' },

  // ── Bottom-Left: وَٱخْتِلَـٰفِ ٱلَّيْلِ وَٱلنَّهَارِ لَـَٔايَـٰتٍ لِّأُو۟لِى ٱلْأَلْبَـٰبِ  (left of bottom star point) ──
  { word: "وَٱخْتِلَـٰفِ", angle: 107, arc: 'bottom', size: '0.85rem' },
  { word: "ٱلَّيْلِ", angle: 120, arc: 'bottom', size: '0.85rem' },
  { word: "وَٱلنَّهَارِ", angle: 148, arc: 'bottom', size: '0.85rem' },
  { word: "لَـَٔايَـٰتٍ", angle: 158, arc: 'bottom', size: '0.85rem' },
  { word: "لِّأُو۟لِى", angle: 168, arc: 'bottom', size: '0.85rem' },
  { word: "ٱلْأَلْبَـٰبِ", angle: 178, arc: 'bottom', size: '0.85rem' },
];

export default function MosqueWeb() {

  return (
    <div className="mosque-web-container">
      <style jsx>{`
        .mosque-web-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Central Node (Nucleus) ── */
        .nucleus-wrapper {
          position: absolute;
          z-index: 10;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          padding: 8px;
          background: ${C.surface};
          border: 2px solid ${C.gold};
          box-shadow: 0 0 40px ${C.goldFaint}4a;
          animation: pulse-nucleus 4s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .nucleus-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .nucleus-label {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: ${C.ink};
          color: ${C.surface};
          padding: 4px 12px;
          border-radius: 20px;
          font-family: 'Lora', serif;
          font-size: 0.9rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .nucleus-wrapper:hover .nucleus-label {
          opacity: 1;
        }

        @keyframes pulse-nucleus {
          0% { transform: scale(1); box-shadow: 0 0 28px ${C.goldFaint}3d; }
          50% { transform: scale(1.03); box-shadow: 0 0 48px ${C.goldFaint}63; }
          100% { transform: scale(1); box-shadow: 0 0 28px ${C.goldFaint}3d; }
        }

        /* ── Orbit Nodes ── */
        .orbit-wrapper {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          padding: 4px;
          background: ${C.surface};
          border: 1px solid ${C.coral};
          box-shadow: 0 4px 16px ${C.ink}14;
          z-index: 5;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
        }

        .orbit-wrapper:hover {
          transform: scale(1.2) translate(-50%, -50%) !important; 
          z-index: 15;
          box-shadow: 0 8px 22px ${C.ink}1f;
          border-color: ${C.gold};
        }
        
        .orbit-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .orbit-label {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: ${C.surface};
          border: 1px solid ${C.border};
          color: ${C.ink};
          padding: 2px 8px;
          border-radius: 12px;
          font-family: 'Lora', serif;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 20;
        }
        .orbit-wrapper:hover .orbit-label { opacity: 1; }

        /* ── Connecting Lines (SVG) ── */
        .web-lines {
          position: absolute;
          inset: -20%;
          width: 140%;
          height: 140%;
          pointer-events: none;
          z-index: 1;
        }
        
        .web-line {
            stroke: ${C.coral};
            stroke-width: 1;
            stroke-dasharray: 4 6;
            opacity: 0.24;
        }

        .web-line.star {
            stroke: ${C.gold};
            opacity: 0.28;
            stroke-dasharray: 0;
            stroke-width: 1.2;
        }

        /* ── Calligraphy Word (circular arc) ── */
        .calli-word {
          position: absolute;
          font-family: 'Amiri', 'Noto Naskh Arabic', serif;
          color: ${C.ink};
          direction: rtl;
          unicode-bidi: embed;
          white-space: nowrap;
          pointer-events: none;
          z-index: 3;
          line-height: 1;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
            .mosque-web-container {
                max-width: 100%;
                transform: scale(1.0);
                margin-top: 15px;
                margin-bottom: 30px;
            }
             .nucleus-wrapper {
                width: 140px;
                height: 140px;
             }
             .orbit-wrapper {
                width: 60px;
                height: 60px;
             }
             .calli-word {
                display: none;
             }
        }
      `}</style>

      {/* ── Calligraphy: individual words on circular arc ── */}
      {CALLI_WORDS.map((item, idx) => {
        const R = 50; // radius in % (outside mosque orbit of 42%)
        const rad = (item.angle * Math.PI) / 180;
        const x = 50 + R * Math.cos(rad);
        const y = 50 + R * Math.sin(rad);
        const rot = item.arc === 'top' ? item.angle + 90 : item.angle - 90;
        return (
          <div
            key={idx}
            className="calli-word"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              fontSize: item.size,
              transform: `translate(-50%, -50%) rotate(${rot}deg)`,
            }}
          >
            {item.word}
          </div>
        );
      })}

      {/* ── SVG Star Connecting Lines ── */}
      <svg className="web-lines" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {GLOBAL_MOSQUES.map((_, i) => {
          const total = GLOBAL_MOSQUES.length;
          const center = { x: 50, y: 50 };

          const getPos = (index: number) => {
            const angle = (index * 360) / total - 90;
            const rad = 38;
            return {
              x: 50 + Math.cos((angle * Math.PI) / 180) * rad,
              y: 50 + Math.sin((angle * Math.PI) / 180) * rad
            };
          };

          const pos = getPos(i);
          const starNextPos = getPos((i + 2) % total);

          return (
            <g key={i}>
              {/* Ray: Center to Node */}
              <line
                x1={center.x} y1={center.y}
                x2={pos.x} y2={pos.y}
                className="web-line"
              />
              {/* Star Connection */}
              <line
                x1={pos.x} y1={pos.y}
                x2={starNextPos.x} y2={starNextPos.y}
                className="web-line star"
              />
            </g>
          );
        })}
      </svg>

      {/* Nucleus */}
      <div className="nucleus-wrapper">
        <Image
          src={NUCLEUS.src}
          alt={NUCLEUS.label}
          fill
          sizes="(max-width: 768px) 140px, 200px" // Helping browser choose size
          className="nucleus-img"
          style={{ objectFit: "cover" }}
          priority // Important for LCP if this is above the fold
        />
        <div className="nucleus-label">{NUCLEUS.label}</div>
      </div>

      {/* Orbit Nodes */}
      {GLOBAL_MOSQUES.map((mosque, i) => {
        const total = GLOBAL_MOSQUES.length;
        const radius = 42;
        const angle = (i * 360) / total - 90;
        const rad = (angle * Math.PI) / 180;
        const left = 50 + radius * Math.cos(rad);
        const top = 50 + radius * Math.sin(rad);

        return (
          <div
            key={mosque.id}
            className="orbit-wrapper"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.2}s`
            }}
            title={mosque.label}
          >
            <Image
              src={mosque.src}
              alt={mosque.label}
              fill
              sizes="(max-width: 768px) 70px, 100px"
              className="orbit-img"
              style={{ objectFit: "cover" }}
            />
            <div className="orbit-label">{mosque.label}</div>
          </div>
        );
      })}
    </div>
  );
}
