"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

/* ───────── palette (matching page.tsx) ───────── */
const C = {
    // same palette as page.tsx for consistency
    skyTop: "#ddd5e8",
    skyMid: "#ecd8cf",
    skyBot: "#f8f1e8",
    surface: "#f3ebe2",
    ink: "#2c2018",
    coral: "#b56a4a",
    gold: "#be9a48",
    goldFaint: "#d4b86a",
    border: "#ddd4ca",
};

/* ───────── Mosque Data ───────── */
// Central Node: Austin, TX
// Position estimates on a standard Mercator map image (0-100%)
// Austin: ~18% Left, ~33% Top (depending on map crop)
// Let's assume the map image covers most of the world.
// We will need to fine-tune these visually.
const NUCLEUS = {
    id: "nueces",
    src: "/Nueces_Mosque.png",
    label: "Nueces Mosque",
    x: 18,
    y: 38
};

// Orbit Nodes
const GLOBAL_MOSQUES = [
    { id: "aqsa", src: "/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_01.jpg", label: "Al-Aqsa", x: 57, y: 36 },
    { id: "nabawi", src: "/Masjid_Nabawi_The_Prophet's_Mosque,_Madina.jpg", label: "Al-Masjid an-Nabawi", x: 58.5, y: 41 },
    { id: "kaaba", src: "/The_Door_of_the_Holy_Kaaba_(2025).jpg", label: "Kaaba", x: 58.5, y: 43.5 },
    { id: "sultan", src: "/Exterior_of_Sultan_Ahmed_I_Mosque_in_Istanbul,_Turkey_002.jpg", label: "Sultan Ahmed", x: 56, y: 32 },
    { id: "umayyad", src: "/Syria,_Damascus,_The_Umayyad_Mosque.jpg", label: "Umayyad Mosque", x: 57.5, y: 34 },
];

export default function MosqueMap() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="mosque-map-container">
            <style jsx>{`
        .mosque-map-container {
          position: relative;
          width: 100%;
          max-width: 1000px; /* wider for map */
          aspect-ratio: 2 / 1; /* rough aspect ratio of world map */
          margin: 0 auto;
          background-image: url("/dawn_world_map.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* ── Nodes Shared Styles ── */
        .map-node {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 10;
          cursor: pointer;
          transition: transform 0.3s, z-index 0.3s, box-shadow 0.3s;
          border-radius: 50%;
          background: ${C.surface};
          border: 1px solid ${C.coral};
          box-shadow: 0 2px 10px ${C.ink}11;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .map-node:hover {
            z-index: 20;
            transform: translate(-50%, -50%) scale(1.5);
            border-color: ${C.gold};
            box-shadow: 0 4px 20px ${C.ink}22;
        }
        
        .map-node.nucleus {
            width: 40px;
            height: 40px;
            border: 2px solid ${C.gold};
            box-shadow: 0 0 20px ${C.goldFaint}66;
            animation: pulse-node 3s infinite;
        }
        
        .map-node.satellite {
            width: 20px;
            height: 20px;
        }
        
        .node-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }

        .node-label {
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            background: ${C.ink};
            color: ${C.surface};
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.7rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
            font-family: 'Lora', serif;
        }
        
        .map-node:hover .node-label {
            opacity: 1;
        }

        @keyframes pulse-node {
            0% { box-shadow: 0 0 10px ${C.goldFaint}44; }
            50% { box-shadow: 0 0 25px ${C.goldFaint}88; }
            100% { box-shadow: 0 0 10px ${C.goldFaint}44; }
        }

        /* ── Connecting Lines (SVG) ── */
        .map-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }
        
        .arc-line {
            fill: none;
            stroke: ${C.coral};
            stroke-width: 1.5;
            stroke-dasharray: 4;
            opacity: 0.4;
            animation: dash-flow 3s linear infinite;
        }
        
        .arc-line.active {
            stroke: ${C.gold};
            opacity: 0.8;
            stroke-width: 2;
        }
        
        @keyframes dash-flow {
            to { stroke-dashoffset: -20; }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
            .mosque-map-container {
                aspect-ratio: 16 / 9;
                background-size: cover; /* crop in a bit? or just contain */
                background-position: 20% center; /* Focus more on Americas/Europe/Africa */
            }
        }
      `}</style>

            <svg className="map-overlay" viewBox="0 0 100 50" preserveAspectRatio="none">
                {/* 
                    Using a fixed coordinate system 100x50 to match approximate 2:1 aspect ratio.
                    We need to map the percent coordinates (x, y) to this viewBox.
                 */}
                {GLOBAL_MOSQUES.map((mosque, i) => {
                    // Start Point (Nueces)
                    // x is 0-100, y is 0-100 (from top style).
                    // In SVG 100x50: x = x, y = y/2.

                    // Quadratic Bezier Curve: M x1 y1 Q cx cy x2 y2
                    // Control point should lift the curve "up" (lower y value) to simulate flight path.

                    const x1 = NUCLEUS.x;
                    const y1 = NUCLEUS.y / 2;
                    const x2 = mosque.x;
                    const y2 = mosque.y / 2;

                    // Control point: mid-x, and significantly higher (lower y) than both points
                    const cx = (x1 + x2) / 2;
                    const cy = Math.min(y1, y2) - 15; // arc height

                    const isActive = hovered === mosque.id;

                    return (
                        <g key={i}>
                            <path
                                d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                                className={`arc-line ${isActive ? 'active' : ''}`}
                            />
                            {/* Particle */}
                            <circle r="0.5" fill={C.gold}>
                                <animateMotion
                                    dur={`${2 + i * 0.5}s`}
                                    repeatCount="indefinite"
                                    path={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                                />
                            </circle>
                        </g>
                    )
                })}
            </svg>

            {/* Nucleus Node */}
            <div
                className="map-node nucleus"
                style={{ left: `${NUCLEUS.x}%`, top: `${NUCLEUS.y}%` }}
                title={NUCLEUS.label}
            >
                <Image
                    src={NUCLEUS.src}
                    alt="Nueces"
                    fill
                    sizes="(max-width: 768px) 40px, 40px"
                    className="node-img"
                    style={{ objectFit: 'cover' }}
                />
                <div className="node-label">{NUCLEUS.label}</div>
            </div>

            {/* Satellite Nodes */}
            {GLOBAL_MOSQUES.map((mosque) => (
                <div
                    key={mosque.id}
                    className="map-node satellite"
                    style={{ left: `${mosque.x}%`, top: `${mosque.y}%` }}
                    onMouseEnter={() => setHovered(mosque.id)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <Image
                        src={mosque.src}
                        alt={mosque.label}
                        fill
                        sizes="(max-width: 768px) 20px, 20px"
                        className="node-img"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="node-label">{mosque.label}</div>
                </div>
            ))}
        </div>
    );
}
