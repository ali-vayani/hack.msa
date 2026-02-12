"use client";

import { useState } from "react";

/* ───────── palette: dawn — fajr light ───────── */
const C = {
  // sky gradient (top → bottom)
  skyTop: "#ddd5e8",       // soft lavender
  skyMid: "#ecd8cf",       // blush-peach
  skyBot: "#f8f1e8",       // warm cream
  // surfaces
  surface: "#f3ebe2",      // warm parchment
  surfaceAlt: "#ede3d8",   // slightly deeper
  // text
  ink: "#2c2018",          // warm charcoal
  inkSoft: "#5a4a3c",      // muted brown
  muted: "#9a887a",        // dusty
  faint: "#b8a898",        // lighter muted
  // accents
  coral: "#b56a4a",        // dusty coral-terracotta (softer, dawn-tinted)
  coralLight: "#cc8868",   // lighter coral
  gold: "#be9a48",         // muted warm gold
  goldFaint: "#d4b86a",    // lighter gold
  // celestial
  moonColor: "#c8c0d6",    // ghostly lavender
  starColor: "#b8b0ca",    // fading star
  // borders
  border: "#ddd4ca",
  borderLight: "#e8e0d8",
};

/* ───────── data ───────── */
const SCHEDULE = {
  "Friday, April 18": [
    { time: "4:00 PM", event: "Doors Open & Check-in" },
    { time: "5:00 PM", event: "Opening Ceremony" },
    { time: "6:00 PM", event: "Team Formation" },
    { time: "6:30 PM", event: "Maghrib Prayer", prayer: true },
    { time: "7:00 PM", event: "Hacking Begins!" },
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

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is hack.msa?",
    a: "hack.msa is UT Austin MSA's first-ever hackathon — a 24-hour event where students come together to build innovative tech solutions that make a difference.",
  },
  {
    q: "Who can participate?",
    a: "Any college student! You don't need to be a UT student or Muslim to participate. Everyone is welcome.",
  },
  {
    q: "Do I need coding experience?",
    a: "Not at all! We welcome complete beginners. We'll have workshops and mentors to help you learn and build.",
  },
  {
    q: "What should I bring?",
    a: "Your laptop, charger, and enthusiasm! We'll provide food, snacks, swag, and everything else you need.",
  },
  {
    q: "Is there a cost to attend?",
    a: "hack.msa is completely free — food, swag, and an unforgettable experience included.",
  },
  {
    q: "How big can teams be?",
    a: "Teams can be 1–4 people. Don't have a team? No worries — we'll help you find one at the event!",
  },
  {
    q: "Will the food be halal?",
    a: "Yes! All food provided will be halal. We'll also accommodate other dietary needs.",
  },
  {
    q: "What about prayer times?",
    a: "Prayer breaks are built into our schedule, and we'll have a dedicated prayer space at the venue.",
  },
];

const SPONSORS = [
  "Emerge",
  "UT MSA",
  "Google",
  "GitHub",
  "Vercel",
  "MongoDB",
];

/* ───────── fading stars ───────── */
function generateStars(count: number) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const top = Math.random() * 60; // concentrate in upper 60% of hero
    out.push({
      left: `${Math.random() * 100}%`,
      top: `${top}%`,
      dur: `${3 + Math.random() * 6}s`,
      delay: `${Math.random() * 8}s`,
      size: `${1 + Math.random() * 1.2}px`,
      opacity: 0.12 + Math.random() * 0.25, // very faint
    });
  }
  return out;
}

const stars = generateStars(100);

/* ───────── CSS ───────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

/* ── fading stars ── */
.dawn-stars {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.dawn-stars .star {
  position: absolute;
  border-radius: 50%;
  background: ${C.starColor};
  animation: star-fade var(--dur) ease-in-out infinite alternate;
  animation-delay: var(--delay);
}

@keyframes star-fade {
  0%   { opacity: var(--base-op, 0.1); transform: scale(1); }
  100% { opacity: calc(var(--base-op, 0.1) * 2.5); transform: scale(1.3); }
}

/* ── geometric pattern — barely there ── */
@keyframes geo-drift {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.geo-ghost {
  animation: geo-drift 200s linear infinite;
  pointer-events: none;
}

/* ── grain ── */
.grain-dawn {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* ── soft glow ── */
@keyframes glow-breathe {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50%      { opacity: 0.55; transform: scale(1.05); }
}

.dawn-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: glow-breathe 10s ease-in-out infinite;
}

/* ── hero entrance ── */
@keyframes dawn-rise {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.dawn-rise  { animation: dawn-rise 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
.dr-d1      { animation-delay: 0.15s; }
.dr-d2      { animation-delay: 0.3s; }
.dr-d3      { animation-delay: 0.5s; }
.dr-d4      { animation-delay: 0.65s; }
.dr-d5      { animation-delay: 0.8s; }

/* ── nav ── */
.nav-dawn {
  text-decoration: none;
  color: ${C.muted};
  font-family: 'Lora', serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: color 0.3s;
  position: relative;
}

.nav-dawn:hover { color: ${C.coral}; }

.nav-dawn::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: ${C.coral};
  transition: width 0.3s;
}

.nav-dawn:hover::after { width: 100%; }

/* ── wave dividers ── */
.wave-dawn {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.wave-dawn svg {
  display: block;
  width: 100%;
  height: auto;
}

/* ── schedule timeline ── */
.sched-dawn {
  position: relative;
  padding-left: 2.5rem;
}

.sched-dawn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: ${C.coral};
  border: 2px solid ${C.surface};
  box-shadow: 0 0 0 2px ${C.coral}88;
}

.sched-dawn.prayer::before {
  background: ${C.gold};
  box-shadow: 0 0 0 2px ${C.gold}88;
}

.sched-line-dawn {
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${C.border};
}

/* ── faq ── */
.faq-dawn {
  border-bottom: 1px solid ${C.border};
  transition: background 0.3s;
}

.faq-dawn:hover {
  background: ${C.surfaceAlt}88;
}

.faq-dawn-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-dawn-body.open {
  max-height: 300px;
}

/* ── sponsor badges ── */
.sponsor-dawn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 2rem;
  border: 1.5px solid ${C.border};
  border-radius: 999px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1rem;
  color: ${C.muted};
  transition: all 0.3s;
  background: ${C.surface}88;
  backdrop-filter: blur(4px);
}

.sponsor-dawn:hover {
  border-color: ${C.coral}66;
  color: ${C.coral};
  background: ${C.coral}08;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px ${C.coral}10;
}

/* ── about cards ── */
.card-dawn {
  padding: 2.5rem 2rem;
  border: 1px solid ${C.border};
  border-radius: 2px;
  background: ${C.surface};
  text-align: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.card-dawn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, ${C.coral}44, transparent);
  opacity: 0;
  transition: opacity 0.4s;
}

.card-dawn:hover::after { opacity: 1; }

.card-dawn:hover {
  border-color: ${C.borderLight};
  transform: translateY(-3px);
  box-shadow: 0 12px 40px ${C.ink}08;
}
`;

export default function Design7() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          background: C.skyBot,
          color: C.ink,
          fontFamily: "'Lora', serif",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Grain overlay */}
        <div className="grain-dawn" />

        {/* ═══ NAVIGATION ═══ */}
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
            backdropFilter: "blur(20px)",
            background: `${C.skyBot}dd`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "1.3rem",
              color: C.coral,
              fontStyle: "italic",
            }}
          >
            hack.msa
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["About", "Schedule", "FAQ", "Sponsors"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="nav-dawn"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>

        {/* ═══════════════ HERO — the dawn sky ═══════════════ */}
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
            overflow: "hidden",
            // The dawn gradient — lavender top → blush mid → warm cream bottom
            background: `linear-gradient(180deg, ${C.skyTop} 0%, ${C.skyMid} 50%, ${C.skyBot} 100%)`,
          }}
        >
          {/* Fading stars — concentrated near the top */}
          <div className="dawn-stars">
            {stars.map((s, i) => (
              <div
                key={i}
                className="star"
                style={
                  {
                    left: s.left,
                    top: s.top,
                    width: s.size,
                    height: s.size,
                    "--dur": s.dur,
                    "--delay": s.delay,
                    "--base-op": s.opacity,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Soft horizon glow — the golden light creeping up */}
          <div
            className="dawn-glow"
            style={{
              width: "120%",
              height: "300px",
              bottom: "-50px",
              left: "-10%",
              background: `radial-gradient(ellipse at 50% 100%, ${C.goldFaint}25, transparent 70%)`,
            }}
          />

          {/* Faint blush glow mid-sky */}
          <div
            className="dawn-glow"
            style={{
              width: "500px",
              height: "500px",
              top: "15%",
              right: "-100px",
              background: `radial-gradient(circle, ${C.moonColor}18, transparent 70%)`,
              animationDelay: "4s",
            }}
          />

          {/* Ghostly crescent moon — top right */}
          <div
            className="dawn-rise"
            style={{
              position: "absolute",
              top: "14%",
              right: "15%",
              opacity: 0.12,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="20" stroke={C.moonColor} strokeWidth="1.5" fill="none" />
              <path
                d="M35 12 A 20 20 0 0 1 35 48 A 14 14 0 0 0 35 12Z"
                fill={C.moonColor}
                opacity="0.4"
              />
            </svg>
          </div>

          {/* Islamic geometric pattern — ghostly, barely visible */}
          <div
            className="geo-ghost"
            style={{
              position: "absolute",
              width: "800px",
              height: "800px",
              top: "50%",
              left: "50%",
              marginLeft: "-400px",
              marginTop: "-400px",
              opacity: 0.025,
            }}
          >
            <svg viewBox="0 0 800 800" fill="none">
              {[0, 45, 90, 135].map((rot) => (
                <rect
                  key={rot}
                  x="300"
                  y="300"
                  width="200"
                  height="200"
                  stroke={C.moonColor}
                  strokeWidth="0.8"
                  transform={`rotate(${rot} 400 400)`}
                />
              ))}
              {[0, 30, 60, 90, 120, 150].map((rot) => (
                <rect
                  key={`i-${rot}`}
                  x="340"
                  y="340"
                  width="120"
                  height="120"
                  stroke={C.coral}
                  strokeWidth="0.4"
                  transform={`rotate(${rot} 400 400)`}
                />
              ))}
              <circle cx="400" cy="400" r="180" stroke={C.moonColor} strokeWidth="0.3" />
              <circle cx="400" cy="400" r="260" stroke={C.goldFaint} strokeWidth="0.2" />
            </svg>
          </div>

          {/* Decorative arch */}
          <div
            className="dawn-rise"
            style={{
              width: 80,
              height: 40,
              borderRadius: "80px 80px 0 0",
              border: `1.5px solid ${C.coral}33`,
              borderBottom: "none",
              marginBottom: "2rem",
            }}
          />

          {/* Small decorative star */}
          <div className="dawn-rise dr-d1" style={{ marginBottom: "1.5rem" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 0L16 12L28 14L16 16L14 28L12 16L0 14L12 12L14 0Z"
                fill={C.coral}
                opacity="0.3"
              />
            </svg>
          </div>

          <h1
            className="dawn-rise dr-d1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: C.ink,
              marginBottom: "1.5rem",
            }}
          >
            hack
            <span style={{ color: C.coral, fontStyle: "italic" }}>.msa</span>
          </h1>

          <p
            className="dawn-rise dr-d2"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              fontStyle: "italic",
              color: C.muted,
              maxWidth: "420px",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Inspiring the next generation of Muslim builders
          </p>

          <div
            className="dawn-rise dr-d3"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "3rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: C.coral,
              }}
            >
              April 18–19, 2026
            </span>
            <span style={{ color: C.border, fontSize: "1.5rem" }}>·</span>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: C.muted,
              }}
            >
              UT Austin
            </span>
          </div>

          <a
            href="#about"
            className="dawn-rise dr-d4"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              background: C.coral,
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "4px",
              textDecoration: "none",
              letterSpacing: "0.03em",
              transition: "all 0.3s",
              boxShadow: `0 4px 20px ${C.coral}28`,
            }}
          >
            Register Now
          </a>

          {/* Scroll indicator */}
          <div
            className="dawn-rise dr-d5"
            style={{
              position: "absolute",
              bottom: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.faint,
                fontStyle: "italic",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "36px",
                background: `linear-gradient(to bottom, ${C.faint}, transparent)`,
              }}
            />
          </div>
        </section>

        {/* Wave divider — dawn colors flowing into surface */}
        <div className="wave-dawn">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
            <path
              d="M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,90 L0,90 Z"
              fill={C.surface}
            />
          </svg>
        </div>

        {/* ═══════════════ ABOUT ═══════════════ */}
        <section
          id="about"
          style={{
            background: C.surface,
            padding: "5rem 2rem 7rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: "850px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  color: C.coral,
                  fontSize: "0.95rem",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                — about —
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: C.ink,
                  marginBottom: "1.5rem",
                }}
              >
                Where Faith Meets
                <br />
                <em style={{ color: C.coral }}>Innovation</em>
              </h2>
              <p
                style={{
                  maxWidth: "580px",
                  margin: "0 auto",
                  color: C.inkSoft,
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
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
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  num: "24",
                  label: "Hours",
                  desc: "Of building, learning, and creating something extraordinary",
                },
                {
                  num: "4",
                  label: "Workshops",
                  desc: "Led by industry mentors to level up your skills",
                },
                {
                  num: "∞",
                  label: "Community",
                  desc: "Connect with Muslim builders from across Texas",
                },
                {
                  num: "$$$",
                  label: "In Prizes",
                  desc: "Win across multiple categories and tracks",
                },
              ].map((c, i) => (
                <div key={i} className="card-dawn">
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      color: C.coral,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {c.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: C.ink,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {c.label}
                  </div>
                  <p
                    style={{
                      color: C.muted,
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave divider back */}
        <div className="wave-dawn" style={{ transform: "scaleY(-1)" }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path
              d="M0,35 C360,70 720,0 1080,35 C1260,52 1350,18 1440,35 L1440,70 L0,70 Z"
              fill={C.surface}
            />
          </svg>
        </div>

        {/* ═══════════════ SCHEDULE ═══════════════ */}
        <section
          id="schedule"
          style={{
            padding: "6rem 2rem 8rem",
            maxWidth: "700px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: C.coral,
                fontSize: "0.95rem",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              — schedule —
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: C.ink,
              }}
            >
              The <em style={{ color: C.coral }}>Journey</em>
            </h2>
          </div>

          {Object.entries(SCHEDULE).map(([day, events]) => (
            <div key={day} style={{ marginBottom: "3rem" }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: C.coral,
                  marginBottom: "1.5rem",
                  letterSpacing: "0.02em",
                }}
              >
                {day}
              </h3>
              <div style={{ position: "relative" }}>
                <div className="sched-line-dawn" />
                {events.map((ev, i) => (
                  <div
                    key={i}
                    className={`sched-dawn ${(ev as { prayer?: boolean }).prayer ? "prayer" : ""}`}
                    style={{
                      padding: "0.8rem 0 0.8rem 2.5rem",
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: C.coral,
                        minWidth: "85px",
                      }}
                    >
                      {ev.time}
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: (ev as { prayer?: boolean }).prayer
                          ? C.gold
                          : C.ink,
                        fontStyle: (ev as { prayer?: boolean }).prayer
                          ? "italic"
                          : "normal",
                      }}
                    >
                      {(ev as { prayer?: boolean }).prayer && "☪ "}
                      {ev.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ═══════════════ FAQ ═══════════════ */}
        <section
          id="faq"
          style={{
            background: C.surface,
            padding: "6rem 2rem 8rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: "650px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  color: C.coral,
                  fontSize: "0.95rem",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                — faq —
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: C.ink,
                }}
              >
                Common <em style={{ color: C.coral }}>Questions</em>
              </h2>
            </div>

            <div>
              {FAQ.map((item, i) => (
                <div key={i} className="faq-dawn">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: C.ink,
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      textAlign: "left",
                    }}
                  >
                    {item.q}
                    <span
                      style={{
                        color: C.coral,
                        fontSize: "1.5rem",
                        fontWeight: 300,
                        transition: "transform 0.3s",
                        transform:
                          openFAQ === i ? "rotate(45deg)" : "rotate(0)",
                        marginLeft: "1rem",
                        flexShrink: 0,
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`faq-dawn-body ${openFAQ === i ? "open" : ""}`}
                  >
                    <p
                      style={{
                        color: C.inkSoft,
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        paddingBottom: "1.25rem",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ SPONSORS ═══════════════ */}
        <section
          id="sponsors"
          style={{
            padding: "6rem 2rem 8rem",
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: C.coral,
                fontSize: "0.95rem",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              — partners —
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: C.ink,
              }}
            >
              Our <em style={{ color: C.coral }}>Sponsors</em>
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {SPONSORS.map((s) => (
              <div key={s} className="sponsor-dawn">
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            borderTop: `1px solid ${C.border}`,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Small star ornament */}
          <div style={{ marginBottom: "1rem" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 0L10.5 7.5L18 9L10.5 10.5L9 18L7.5 10.5L0 9L7.5 7.5L9 0Z"
                fill={C.coral}
                opacity="0.25"
              />
            </svg>
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: C.coral,
              fontStyle: "italic",
              marginBottom: "0.75rem",
            }}
          >
            hack.msa
          </div>
          <p
            style={{
              color: C.muted,
              fontSize: "0.85rem",
              marginBottom: "0.25rem",
            }}
          >
            UT Austin MSA&apos;s First-Ever Hackathon
          </p>
          <p style={{ color: C.faint, fontSize: "0.8rem" }}>
            April 18–19, 2026 · Austin, TX
          </p>
        </footer>
      </div>
    </>
  );
}

