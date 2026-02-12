"use client";

import { useState } from "react";

/* ───────── palette: warm twilight desert sky ───────── */
const C = {
  bg: "#140e0a",
  bgDeep: "#0e0906",
  surface: "#1e1510",
  surfaceLight: "#2a1f17",
  terracotta: "#c2703e",
  terracottaGlow: "#d4856a",
  amber: "#d4a843",
  amberLight: "#e8c66a",
  cream: "#faf3e8",
  sand: "#e8d5b8",
  dusty: "#a89078",
  clay: "#8b6e54",
  warmMuted: "#7a6455",
  plum: "#2a1525",
  duskPurple: "#3d2040",
  border: "#2e231c",
  borderLight: "#3d3028",
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

/* ───────── star generation ───────── */
function generateStars(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      dur: `${2 + Math.random() * 5}s`,
      delay: `${Math.random() * 6}s`,
      size: `${1 + Math.random() * 1.5}px`,
      // warm star colors
      color:
        Math.random() > 0.6
          ? C.amberLight
          : Math.random() > 0.3
            ? C.sand
            : C.cream,
    });
  }
  return stars;
}

const stars = generateStars(180);

/* ───────── CSS ───────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

/* ── star field ── */
.star-field {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.star-field .star {
  position: absolute;
  border-radius: 50%;
  animation: twinkle-warm var(--dur) ease-in-out infinite alternate;
  animation-delay: var(--delay);
}

@keyframes twinkle-warm {
  0%   { opacity: 0.15; transform: scale(1); }
  100% { opacity: 0.9;  transform: scale(1.4); }
}

/* ── glow orbs ── */
@keyframes glow-drift {
  0%, 100% {
    filter: blur(50px) brightness(1);
    transform: translate(0, 0);
  }
  33% {
    filter: blur(60px) brightness(1.2);
    transform: translate(20px, -15px);
  }
  66% {
    filter: blur(45px) brightness(0.9);
    transform: translate(-15px, 10px);
  }
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  animation: glow-drift 14s ease-in-out infinite;
  pointer-events: none;
}

/* ── geometric spin ── */
@keyframes geo-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.geo-spin-slow {
  animation: geo-spin 150s linear infinite;
}

/* ── grain overlay ── */
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* ── hero entrance ── */
@keyframes hero-emerge {
  from { opacity: 0; transform: translateY(50px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}

.hero-emerge  { animation: hero-emerge 1.1s cubic-bezier(0.16, 1, 0.3, 1) both; }
.hero-d1      { animation-delay: 0.2s; }
.hero-d2      { animation-delay: 0.4s; }
.hero-d3      { animation-delay: 0.6s; }
.hero-d4      { animation-delay: 0.75s; }

/* ── nav ── */
.nav-link-tw {
  text-decoration: none;
  color: ${C.clay};
  font-family: 'Lora', serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: color 0.3s;
  position: relative;
}

.nav-link-tw:hover { color: ${C.terracotta}; }

.nav-link-tw::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: ${C.terracotta};
  transition: width 0.3s;
}

.nav-link-tw:hover::after { width: 100%; }

/* ── wave dividers ── */
.wave-divider {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.wave-divider svg {
  display: block;
  width: 100%;
  height: auto;
}

/* ── schedule timeline ── */
.sched-item {
  position: relative;
  padding-left: 2.5rem;
}

.sched-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: ${C.terracotta};
  border: 2px solid ${C.bg};
  box-shadow: 0 0 0 2px ${C.terracotta}, 0 0 12px ${C.terracotta}44;
}

.sched-item.prayer::before {
  background: ${C.amber};
  box-shadow: 0 0 0 2px ${C.amber}, 0 0 12px ${C.amber}44;
}

.sched-line {
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, ${C.border}, ${C.borderLight}, ${C.border});
}

/* ── faq accordion ── */
.faq-tw {
  border-bottom: 1px solid ${C.border};
  transition: background 0.3s;
}

.faq-tw:hover {
  background: ${C.surface}88;
}

.faq-tw-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-tw-body.open {
  max-height: 300px;
}

/* ── sponsor badges ── */
.sponsor-tw {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 2rem;
  border: 1px solid ${C.border};
  border-radius: 999px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1rem;
  color: ${C.clay};
  transition: all 0.3s;
  background: ${C.surface}44;
  backdrop-filter: blur(8px);
}

.sponsor-tw:hover {
  border-color: ${C.terracotta}88;
  color: ${C.terracotta};
  background: ${C.terracotta}0c;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px ${C.terracotta}15;
}

/* ── about cards ── */
.about-card {
  padding: 2.5rem 2rem;
  border: 1px solid ${C.border};
  border-radius: 2px;
  background: ${C.surface};
  text-align: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.about-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, ${C.terracotta}08, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
}

.about-card:hover::before { opacity: 1; }

.about-card:hover {
  border-color: ${C.borderLight};
  transform: translateY(-3px);
  box-shadow: 0 12px 40px ${C.bgDeep}80;
}
`;

export default function Design6() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          background: `linear-gradient(180deg, ${C.plum} 0%, ${C.bg} 30%, ${C.bg} 100%)`,
          color: C.cream,
          fontFamily: "'Lora', serif",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grain overlay */}
        <div className="grain" />

        {/* Star field — warm tones */}
        <div className="star-field">
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
                  background: s.color,
                  "--dur": s.dur,
                  "--delay": s.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Warm glow orbs */}
        <div
          className="glow-orb"
          style={{
            width: 550,
            height: 550,
            background: `radial-gradient(circle, ${C.terracotta}1a, transparent 70%)`,
            top: "-150px",
            right: "-150px",
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: 450,
            height: 450,
            background: `radial-gradient(circle, ${C.amber}12, transparent 70%)`,
            bottom: "5%",
            left: "-120px",
            animationDelay: "5s",
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: 350,
            height: 350,
            background: `radial-gradient(circle, ${C.duskPurple}30, transparent 70%)`,
            top: "40%",
            left: "60%",
            animationDelay: "9s",
          }}
        />

        {/* Islamic geometric pattern — slowly rotating */}
        <div
          className="geo-spin-slow"
          style={{
            position: "fixed",
            width: "900px",
            height: "900px",
            top: "50%",
            left: "50%",
            marginLeft: "-450px",
            marginTop: "-450px",
            opacity: 0.025,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <svg viewBox="0 0 900 900" fill="none">
            {/* Overlapping rotated squares — 8-pointed star motif */}
            {[0, 45, 90, 135].map((rot) => (
              <rect
                key={rot}
                x="325"
                y="325"
                width="250"
                height="250"
                stroke={C.amber}
                strokeWidth="0.8"
                transform={`rotate(${rot} 450 450)`}
              />
            ))}
            {[0, 30, 60, 90, 120, 150].map((rot) => (
              <rect
                key={`inner-${rot}`}
                x="375"
                y="375"
                width="150"
                height="150"
                stroke={C.terracotta}
                strokeWidth="0.5"
                transform={`rotate(${rot} 450 450)`}
              />
            ))}
            <circle cx="450" cy="450" r="200" stroke={C.amber} strokeWidth="0.4" />
            <circle cx="450" cy="450" r="280" stroke={C.terracotta} strokeWidth="0.3" />
            <circle cx="450" cy="450" r="350" stroke={C.amber} strokeWidth="0.2" />
          </svg>
        </div>

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
            backdropFilter: "blur(24px)",
            background: `${C.bg}cc`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "1.3rem",
              color: C.terracotta,
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
                className="nav-link-tw"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>

        {/* ═══════════════════ HERO ═══════════════════ */}
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
          {/* Decorative arch (from Design 2) */}
          <div
            className="hero-emerge"
            style={{
              width: 80,
              height: 40,
              borderRadius: "80px 80px 0 0",
              border: `1.5px solid ${C.terracotta}44`,
              borderBottom: "none",
              marginBottom: "2rem",
            }}
          />

          {/* 4-pointed star ornament */}
          <div className="hero-emerge hero-d1" style={{ marginBottom: "1.5rem" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5L16 0Z"
                fill={C.amber}
                opacity="0.5"
              />
            </svg>
          </div>

          <h1
            className="hero-emerge hero-d1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            hack
            <span style={{ color: C.terracotta, fontStyle: "italic" }}>.msa</span>
          </h1>

          <p
            className="hero-emerge hero-d2"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              fontStyle: "italic",
              color: C.dusty,
              maxWidth: "420px",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Inspiring the next generation of Muslim builders
          </p>

          <div
            className="hero-emerge hero-d3"
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
                color: C.terracotta,
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
                color: C.clay,
              }}
            >
              UT Austin
            </span>
          </div>

          <a
            href="#about"
            className="hero-emerge hero-d4"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              background: `linear-gradient(135deg, ${C.terracotta}, ${C.terracotta}dd)`,
              color: C.cream,
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "4px",
              textDecoration: "none",
              letterSpacing: "0.03em",
              transition: "all 0.3s",
              boxShadow: `0 4px 24px ${C.terracotta}33, 0 0 60px ${C.terracotta}11`,
            }}
          >
            Register Now
          </a>

          {/* Scroll indicator — vertical bars from Design 2 + line from Design 1 */}
          <div
            className="hero-emerge hero-d4"
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
                color: C.warmMuted,
                fontStyle: "italic",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "40px",
                background: `linear-gradient(to bottom, ${C.warmMuted}, transparent)`,
              }}
            />
          </div>
        </section>

        {/* Wave divider into About */}
        <div className="wave-divider">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
            <path
              d="M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,90 L0,90 Z"
              fill={C.surface}
            />
          </svg>
        </div>

        {/* ═══════════════════ ABOUT ═══════════════════ */}
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
                  color: C.terracotta,
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
                  color: C.cream,
                  marginBottom: "1.5rem",
                }}
              >
                Where Faith Meets
                <br />
                <em style={{ color: C.terracotta }}>Innovation</em>
              </h2>
              <p
                style={{
                  maxWidth: "580px",
                  margin: "0 auto",
                  color: C.dusty,
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
                <div key={i} className="about-card">
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      color: C.terracotta,
                      marginBottom: "0.25rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {c.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: C.cream,
                      marginBottom: "0.5rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {c.label}
                  </div>
                  <p
                    style={{
                      color: C.warmMuted,
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave divider out of About */}
        <div className="wave-divider" style={{ transform: "scaleY(-1)" }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path
              d="M0,35 C360,70 720,0 1080,35 C1260,52 1350,18 1440,35 L1440,70 L0,70 Z"
              fill={C.surface}
            />
          </svg>
        </div>

        {/* ═══════════════════ SCHEDULE ═══════════════════ */}
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
                color: C.terracotta,
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
                color: C.cream,
              }}
            >
              The <em style={{ color: C.terracotta }}>Journey</em>
            </h2>
          </div>

          {Object.entries(SCHEDULE).map(([day, events]) => (
            <div key={day} style={{ marginBottom: "3rem" }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: C.terracotta,
                  marginBottom: "1.5rem",
                  letterSpacing: "0.02em",
                }}
              >
                {day}
              </h3>
              <div style={{ position: "relative" }}>
                <div className="sched-line" />
                {events.map((ev, i) => (
                  <div
                    key={i}
                    className={`sched-item ${(ev as { prayer?: boolean }).prayer ? "prayer" : ""}`}
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
                        color: C.terracotta,
                        minWidth: "85px",
                      }}
                    >
                      {ev.time}
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: (ev as { prayer?: boolean }).prayer
                          ? C.amber
                          : C.cream,
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

        {/* ═══════════════════ FAQ ═══════════════════ */}
        <section
          id="faq"
          style={{
            background: C.surface,
            padding: "6rem 2rem 8rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Subtle top wave into FAQ */}
          <div
            className="wave-divider"
            style={{
              position: "absolute",
              top: "-1px",
              left: 0,
              right: 0,
              transform: "scaleY(-1) scaleX(-1)",
            }}
          >
            <svg viewBox="0 0 1440 50" preserveAspectRatio="none">
              <path
                d="M0,25 C360,50 720,0 1080,25 C1260,37 1350,12 1440,25 L1440,50 L0,50 Z"
                fill={C.bg}
              />
            </svg>
          </div>

          <div style={{ maxWidth: "650px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  color: C.terracotta,
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
                  color: C.cream,
                }}
              >
                Common <em style={{ color: C.terracotta }}>Questions</em>
              </h2>
            </div>

            <div>
              {FAQ.map((item, i) => (
                <div key={i} className="faq-tw">
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
                      color: C.cream,
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      textAlign: "left",
                    }}
                  >
                    {item.q}
                    <span
                      style={{
                        color: C.terracotta,
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
                  <div className={`faq-tw-body ${openFAQ === i ? "open" : ""}`}>
                    <p
                      style={{
                        color: C.dusty,
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

        {/* ═══════════════════ SPONSORS ═══════════════════ */}
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
                color: C.terracotta,
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
                color: C.cream,
              }}
            >
              Our <em style={{ color: C.terracotta }}>Sponsors</em>
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
              <div key={s} className="sponsor-tw">
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <footer
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            borderTop: `1px solid ${C.border}`,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Small decorative star */}
          <div style={{ marginBottom: "1rem" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 0L11.75 8.25L20 10L11.75 11.75L10 20L8.25 11.75L0 10L8.25 8.25L10 0Z"
                fill={C.amber}
                opacity="0.35"
              />
            </svg>
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: C.terracotta,
              fontStyle: "italic",
              marginBottom: "0.75rem",
            }}
          >
            hack.msa
          </div>
          <p
            style={{
              color: C.warmMuted,
              fontSize: "0.85rem",
              marginBottom: "0.25rem",
            }}
          >
            UT Austin MSA&apos;s First-Ever Hackathon
          </p>
          <p style={{ color: C.warmMuted, fontSize: "0.8rem", opacity: 0.5 }}>
            April 18–19, 2026 · Austin, TX
          </p>
        </footer>
      </div>
    </>
  );
}

