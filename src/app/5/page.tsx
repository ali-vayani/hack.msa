"use client";

import { useState } from "react";

const C = {
  navy: "#0a1628",
  deepNavy: "#060e1a",
  emerald: "#0f6b4e",
  emeraldBright: "#1a9e72",
  gold: "#c9a84c",
  goldLight: "#e0c872",
  cream: "#f5edd6",
  white: "#f0ece0",
  muted: "#7a8ba8",
  teal: "#1a5c6b",
  border: "#162444",
};

const SCHEDULE = {
  "Friday, April 18": [
    { time: "4:00 PM", event: "Doors Open & Check-in" },
    { time: "5:00 PM", event: "Opening Ceremony" },
    { time: "6:00 PM", event: "Team Formation" },
    { time: "6:30 PM", event: "Maghrib Prayer", prayer: true },
    { time: "7:00 PM", event: "Hacking Begins" },
    { time: "8:30 PM", event: "Isha Prayer", prayer: true },
    { time: "9:00 PM", event: "Workshop: Building with AI" },
    { time: "11:00 PM", event: "Late-Night Snacks" },
  ],
  "Saturday, April 19": [
    { time: "6:00 AM", event: "Fajr Prayer", prayer: true },
    { time: "8:00 AM", event: "Breakfast" },
    { time: "12:00 PM", event: "Dhuhr Prayer & Lunch", prayer: true },
    { time: "1:00 PM", event: "Hacking Ends" },
    { time: "1:30 PM", event: "Project Demos" },
    { time: "3:30 PM", event: "Asr Prayer", prayer: true },
    { time: "4:00 PM", event: "Closing Ceremony & Awards" },
  ],
};

const FAQ = [
  { q: "What is hack.msa?", a: "UT Austin MSA's first-ever hackathon — a 24-hour event where students come together to build innovative tech solutions that make a difference." },
  { q: "Who can participate?", a: "Any college student. You don't need to be a UT student or Muslim. Everyone is welcome." },
  { q: "Do I need coding experience?", a: "Not at all. We welcome complete beginners. Workshops and mentors will help you learn and build." },
  { q: "What should I bring?", a: "Your laptop, charger, and enthusiasm. We provide food, snacks, swag, and everything else." },
  { q: "Is there a cost?", a: "hack.msa is completely free — food, swag, and an unforgettable experience included." },
  { q: "How big can teams be?", a: "Teams can be 1–4 people. Don't have a team? We'll help you find one at the event." },
  { q: "Will the food be halal?", a: "Yes. All food provided will be halal. We also accommodate other dietary needs." },
  { q: "What about prayer times?", a: "Prayer breaks are built into our schedule, with a dedicated prayer space at the venue." },
];

const SPONSORS = ["Emerge", "UT MSA", "Google", "GitHub", "Vercel", "MongoDB"];

/* Geometric pattern SVG for backgrounds */
const geometricPatternSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <pattern id="geo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <!-- 8-pointed star -->
      <polygon points="50,10 61,39 50,28 39,39" fill="none" stroke="${C.gold}" stroke-width="0.5" opacity="0.3"/>
      <polygon points="50,90 61,61 50,72 39,61" fill="none" stroke="${C.gold}" stroke-width="0.5" opacity="0.3"/>
      <polygon points="10,50 39,39 28,50 39,61" fill="none" stroke="${C.gold}" stroke-width="0.5" opacity="0.3"/>
      <polygon points="90,50 61,39 72,50 61,61" fill="none" stroke="${C.gold}" stroke-width="0.5" opacity="0.3"/>
      <rect x="30" y="30" width="40" height="40" fill="none" stroke="${C.gold}" stroke-width="0.5" opacity="0.2" transform="rotate(45 50 50)"/>
      <circle cx="50" cy="50" r="20" fill="none" stroke="${C.gold}" stroke-width="0.3" opacity="0.15"/>
    </pattern>
  </defs>
  <rect width="200" height="200" fill="url(#geo)"/>
</svg>
`;

const patternDataUrl = `data:image/svg+xml,${encodeURIComponent(geometricPatternSVG)}`;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

@keyframes rotate-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.geo-rotate {
  animation: rotate-slow 90s linear infinite;
}

.gold-shimmer {
  background: linear-gradient(
    90deg,
    ${C.gold} 0%,
    ${C.goldLight} 25%,
    ${C.gold} 50%,
    ${C.goldLight} 75%,
    ${C.gold} 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 6s linear infinite;
}

.mosaic-card {
  background: ${C.navy};
  border: 1px solid ${C.border};
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mosaic-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("${patternDataUrl}");
  background-size: 100px 100px;
  opacity: 0;
  transition: opacity 0.4s;
}

.mosaic-card:hover::before {
  opacity: 1;
}

.mosaic-card:hover {
  border-color: ${C.gold}44;
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(201, 168, 76, 0.08);
}

.faq-mosaic {
  border-bottom: 1px solid ${C.border};
  transition: all 0.3s;
}

.faq-mosaic:hover {
  background: ${C.navy};
}

.faq-mosaic-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-mosaic-body.open {
  max-height: 250px;
}

.nav-mosaic {
  text-decoration: none;
  color: ${C.muted};
  font-family: 'Karla', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.3s;
}

.nav-mosaic:hover {
  color: ${C.gold};
}

.sponsor-mosaic {
  padding: 1.5rem 2rem;
  border: 1px solid ${C.border};
  background: ${C.navy};
  text-align: center;
  font-family: 'Syne', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: ${C.muted};
  letter-spacing: 0.03em;
  transition: all 0.3s;
  clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
}

.sponsor-mosaic:hover {
  border-color: ${C.gold}66;
  color: ${C.gold};
  background: ${C.border};
}

.schedule-mosaic-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 2rem;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid ${C.border}88;
  align-items: center;
  transition: background 0.2s;
}

.schedule-mosaic-row:hover {
  background: ${C.navy};
}

@keyframes mosaic-hero {
  from { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.mosaic-hero-anim {
  animation: mosaic-hero 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.mh-d1 { animation-delay: 0.15s; }
.mh-d2 { animation-delay: 0.3s; }
.mh-d3 { animation-delay: 0.45s; }
.mh-d4 { animation-delay: 0.6s; }

@keyframes octagon-draw {
  from { stroke-dashoffset: 600; }
  to { stroke-dashoffset: 0; }
}

.octagon-draw {
  stroke-dasharray: 600;
  animation: octagon-draw 3s ease-out both;
}
`;

/* Octagonal frame SVG */
function OctagonFrame({ size = 300, strokeColor = C.gold }: { size?: number; strokeColor?: string }) {
  const r = size / 2;
  const inset = size * 0.15;
  const points = [];
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8 - Math.PI / 8;
    points.push(`${r + (r - inset) * Math.cos(angle)},${r + (r - inset) * Math.sin(angle)}`);
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", opacity: 0.15 }}
    >
      <polygon
        points={points.join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        className="octagon-draw"
      />
      <polygon
        points={points.join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
        transform={`rotate(22.5 ${r} ${r})`}
        className="octagon-draw"
        style={{ animationDelay: "0.5s" }}
      />
      <circle
        cx={r}
        cy={r}
        r={r - inset - 20}
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
        className="octagon-draw"
        style={{ animationDelay: "1s" }}
      />
    </svg>
  );
}

export default function Design5() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          background: C.deepNavy,
          color: C.cream,
          fontFamily: "'Karla', sans-serif",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Background pattern overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: `url("${patternDataUrl}")`,
            backgroundSize: "200px 200px",
            opacity: 0.04,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Nav */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "1.25rem 3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: `${C.deepNavy}ee`,
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: C.gold,
              letterSpacing: "-0.01em",
            }}
          >
            hack.msa
          </span>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {["About", "Schedule", "FAQ", "Sponsors"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="nav-mosaic"
              >
                {l}
              </a>
            ))}
          </div>
        </nav>

        {/* ═══ HERO ═══ */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "8rem 2rem 6rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Decorative octagonal frames */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <OctagonFrame size={500} />
          </div>
          <div
            className="geo-rotate"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <OctagonFrame size={650} strokeColor={C.emerald} />
          </div>

          {/* Decorative top element — 8-pointed star */}
          <div className="mosaic-hero-anim" style={{ marginBottom: "2rem" }}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <polygon
                points="25,2 29,21 25,16 21,21"
                fill={C.gold}
                opacity="0.6"
              />
              <polygon
                points="25,48 29,29 25,34 21,29"
                fill={C.gold}
                opacity="0.6"
              />
              <polygon
                points="2,25 21,21 16,25 21,29"
                fill={C.gold}
                opacity="0.6"
              />
              <polygon
                points="48,25 29,21 34,25 29,29"
                fill={C.gold}
                opacity="0.6"
              />
              <rect
                x="15"
                y="15"
                width="20"
                height="20"
                fill="none"
                stroke={C.gold}
                strokeWidth="1"
                transform="rotate(45 25 25)"
                opacity="0.4"
              />
            </svg>
          </div>

          <h1
            className="mosaic-hero-anim mh-d1"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span className="gold-shimmer">hack</span>
            <span style={{ color: C.emeraldBright }}>.</span>
            <span className="gold-shimmer">msa</span>
          </h1>

          <p
            className="mosaic-hero-anim mh-d2"
            style={{
              fontSize: "1.1rem",
              color: C.muted,
              maxWidth: "400px",
              lineHeight: 1.7,
              marginTop: "1.5rem",
              marginBottom: "2.5rem",
              fontWeight: 400,
            }}
          >
            Inspiring the next generation of Muslim builders
          </p>

          <div
            className="mosaic-hero-anim mh-d3"
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              marginBottom: "3rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "0.6rem 1.5rem",
                border: `1px solid ${C.gold}33`,
                color: C.gold,
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
                background: `${C.gold}0a`,
              }}
            >
              April 18–19, 2026
            </div>
            <div
              style={{
                padding: "0.6rem 1.5rem",
                border: `1px solid ${C.border}`,
                color: C.muted,
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
              }}
            >
              UT Austin
            </div>
          </div>

          <a
            href="#about"
            className="mosaic-hero-anim mh-d4"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              background: `linear-gradient(135deg, ${C.emerald}, ${C.teal})`,
              color: C.cream,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "all 0.3s",
              clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
              boxShadow: `0 4px 24px ${C.emerald}33`,
            }}
          >
            Register Now
          </a>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section
          id="about"
          style={{
            padding: "8rem 2rem",
            maxWidth: "950px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            {/* Decorative divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: `linear-gradient(to right, transparent, ${C.gold}44)`,
                }}
              />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="4"
                  y="4"
                  width="8"
                  height="8"
                  fill="none"
                  stroke={C.gold}
                  strokeWidth="1"
                  transform="rotate(45 8 8)"
                />
              </svg>
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: `linear-gradient(to left, transparent, ${C.gold}44)`,
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
              }}
            >
              Where <span style={{ color: C.emeraldBright }}>Faith</span> Meets{" "}
              <span style={{ color: C.gold }}>Innovation</span>
            </h2>
            <p
              style={{
                color: C.muted,
                fontSize: "1.05rem",
                lineHeight: 1.8,
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              hack.msa is UT Austin MSA&apos;s inaugural hackathon — a 24-hour
              sprint where Muslim students and allies come together to build,
              learn, and innovate. Whether you&apos;re a seasoned developer or
              writing your first line of code, this is your launchpad.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" stroke={C.gold} strokeWidth="1" />
                    <path d="M14 6v8l5 3" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "24 Hours",
                desc: "Of building, learning, and creating something extraordinary",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="10" cy="12" r="4" stroke={C.emeraldBright} strokeWidth="1" />
                    <circle cx="18" cy="12" r="4" stroke={C.emeraldBright} strokeWidth="1" />
                    <path d="M6 22c0-4 4-6 8-6s8 2 8 6" stroke={C.emeraldBright} strokeWidth="1" />
                  </svg>
                ),
                title: "Community",
                desc: "Connect with Muslim builders and allies from across Texas",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="8" width="20" height="14" rx="2" stroke={C.gold} strokeWidth="1" />
                    <path d="M8 6h12" stroke={C.gold} strokeWidth="1" strokeLinecap="round" />
                    <circle cx="14" cy="15" r="3" stroke={C.gold} strokeWidth="1" />
                  </svg>
                ),
                title: "Workshops",
                desc: "Learn from industry professionals and experienced mentors",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <polygon points="14,4 17,11 24,12 19,17 20,24 14,21 8,24 9,17 4,12 11,11" stroke={C.emeraldBright} strokeWidth="1" fill="none" />
                  </svg>
                ),
                title: "Prizes",
                desc: "Win prizes across multiple categories and tracks",
              },
            ].map((card, i) => (
              <div key={i} className="mosaic-card">
                <div style={{ marginBottom: "1rem", position: "relative", zIndex: 1 }}>
                  {card.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    marginBottom: "0.5rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SCHEDULE ═══ */}
        <section
          id="schedule"
          style={{
            padding: "8rem 2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              maxWidth: "750px",
              margin: "0 auto",
              background: C.navy,
              border: `1px solid ${C.border}`,
              padding: "3rem",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: `linear-gradient(to right, transparent, ${C.gold}44)`,
                  }}
                />
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="3" y="3" width="6" height="6" fill="none" stroke={C.gold} strokeWidth="0.5" transform="rotate(45 6 6)" />
                </svg>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: `linear-gradient(to left, transparent, ${C.gold}44)`,
                  }}
                />
              </div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                The <span style={{ color: C.gold }}>Schedule</span>
              </h2>
            </div>

            {Object.entries(SCHEDULE).map(([day, events]) => (
              <div key={day} style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: C.emeraldBright,
                    letterSpacing: "0.04em",
                    marginBottom: "0.75rem",
                    paddingBottom: "0.75rem",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {day}
                </h3>
                {events.map((ev, i) => (
                  <div key={i} className="schedule-mosaic-row">
                    <span
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: C.gold,
                      }}
                    >
                      {ev.time}
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: (ev as { prayer?: boolean }).prayer
                          ? C.emeraldBright
                          : C.cream,
                        fontWeight: (ev as { prayer?: boolean }).prayer
                          ? 500
                          : 400,
                      }}
                    >
                      {(ev as { prayer?: boolean }).prayer && "☪ "}
                      {ev.event}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section
          id="faq"
          style={{
            padding: "8rem 2rem",
            maxWidth: "700px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: `linear-gradient(to right, transparent, ${C.gold}44)`,
                }}
              />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="4" y="4" width="8" height="8"
                  fill="none" stroke={C.gold} strokeWidth="1"
                  transform="rotate(45 8 8)"
                />
              </svg>
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: `linear-gradient(to left, transparent, ${C.gold}44)`,
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Questions <span style={{ color: C.gold }}>&</span> Answers
            </h2>
          </div>

          {FAQ.map((item, i) => (
            <div key={i} className="faq-mosaic">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "1.25rem 0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: C.cream,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textAlign: "left",
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "'Karla', sans-serif",
                      fontSize: "0.7rem",
                      color: C.emeraldBright,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.q}
                </span>
                <span
                  style={{
                    color: C.gold,
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    transform: openFAQ === i ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 0.3s",
                    flexShrink: 0,
                    marginLeft: "1.5rem",
                  }}
                >
                  +
                </span>
              </button>
              <div className={`faq-mosaic-body ${openFAQ === i ? "open" : ""}`}>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    padding: "0 0.5rem 1.5rem 2.75rem",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ═══ SPONSORS ═══ */}
        <section
          id="sponsors"
          style={{
            padding: "8rem 2rem",
            maxWidth: "850px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: `linear-gradient(to right, transparent, ${C.gold}44)`,
                }}
              />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="4" y="4" width="8" height="8"
                  fill="none" stroke={C.gold} strokeWidth="1"
                  transform="rotate(45 8 8)"
                />
              </svg>
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: `linear-gradient(to left, transparent, ${C.gold}44)`,
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Our <span style={{ color: C.gold }}>Sponsors</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {SPONSORS.map((s) => (
              <div key={s} className="sponsor-mosaic">
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            borderTop: `1px solid ${C.border}`,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ color: C.gold }}>hack</span>
            <span style={{ color: C.emeraldBright }}>.</span>
            <span style={{ color: C.gold }}>msa</span>
          </div>
          <p style={{ color: C.muted, fontSize: "0.85rem", marginBottom: "0.25rem" }}>
            UT Austin MSA&apos;s First-Ever Hackathon
          </p>
          <p style={{ color: C.muted, fontSize: "0.8rem", opacity: 0.5 }}>
            April 18–19, 2026 · Austin, TX
          </p>
        </footer>
      </div>
    </>
  );
}

