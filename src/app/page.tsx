"use client";

import { useState, useEffect } from "react";

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
  starColor: "#e8ddd0",    // warm cream-white star
  // borders
  border: "#ddd4ca",
  borderLight: "#e8e0d8",
};

/* ───────── data ───────── */
const SCHEDULE = {
  "Saturday, April 18": [
    { time: "11:00 AM", event: "Check-in" },
    { time: "12:00 PM", event: "Opening Ceremony" },
    { time: "1:00 PM", event: "Lunch & Dhuhr Prayer", prayer: true },
    { time: "4:00 PM", event: "Asr Prayer", prayer: true },
    { time: "4:15 PM", event: "Title Sponsor Event" },
    { time: "7:00 PM", event: "Maghrib Prayer", prayer: true },
    { time: "8:00 PM", event: "Dinner & Isha Prayer", prayer: true },
    { time: "11:00 PM", event: "Fireside Chat @ Nueces" },
  ],
  "Sunday, April 19": [
    { time: "6:00 AM", event: "Fajr Prayer", prayer: true },
    { time: "9:00 AM", event: "Breakfast" },
    { time: "10:00 AM", event: "Judging" },
    { time: "11:30 AM", event: "Closing Ceremony" },
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
  {
    q: "What if I missed the application deadline?",
    a: "We'll have walk-in registration on Saturday, April 19th! The specific closing time will be announced on our website during event week. This is first come, first serve until we hit capacity — admission is not guaranteed, so we advise non-Austin attendees to not travel for walk-in registration.",
  },
  {
    q: "How can I volunteer or mentor?",
    a: "We're always looking for mentors to answer student questions and workshop suggestions, as well as general volunteers to help run the event. If you want to help out, reach out to us at team@hackmsa.com!",
  },
  {
    q: "Do you provide travel reimbursements?",
    a: "Unfortunately, we won't be able to provide travel reimbursements this year. We encourage you to look into low-cost transportation options like carpooling with friends or other attendees.",
  },
  {
    q: "I have more questions. Who do I contact?",
    a: "If you have further questions, don't hesitate to reach out to team@hackmsa.org. We're here to help!",
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

/* ───────── 4-pointed decorative stars ───────── */
function generateStars(count: number) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const top = Math.random() * 100;
    // Opacity gradient: more visible near top, fading lower
    const opacityBase = top < 35
      ? 0.25 + Math.random() * 0.35
      : top < 65
        ? 0.15 + Math.random() * 0.25
        : 0.08 + Math.random() * 0.15;
    // Size: mix of small and occasional larger ones
    const sizeRoll = Math.random();
    const size = sizeRoll < 0.6
      ? 8 + Math.random() * 6      // small (8–14px)
      : sizeRoll < 0.9
        ? 14 + Math.random() * 8    // medium (14–22px)
        : 22 + Math.random() * 10;  // large (22–32px)
    out.push({
      left: `${Math.random() * 100}%`,
      top: `${top}%`,
      dur: `${4 + Math.random() * 6}s`,
      delay: `${Math.random() * 8}s`,
      size,
      opacity: opacityBase,
      rotation: Math.random() * 45, // slight random rotation for variety
    });
  }
  return out;
}

const stars = generateStars(80);

/* ───────── CSS ───────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');

/* ── prevent white overscroll ── */
html, body {
  background-color: ${C.skyBot} !important;
  min-height: 100vh;
}

/* ── 4-pointed decorative stars ── */
.dawn-stars {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.dawn-stars .star-4 {
  position: absolute;
  animation: star-twinkle var(--dur) ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes star-twinkle {
  0%   { opacity: var(--base-op, 0.15); transform: rotate(var(--rot, 0deg)) scale(1); }
  50%  { opacity: calc(var(--base-op, 0.15) * 2); transform: rotate(var(--rot, 0deg)) scale(1.15); }
  100% { opacity: var(--base-op, 0.15); transform: rotate(var(--rot, 0deg)) scale(1); }
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

/* ── mobile navigation ── */
@media (max-width: 768px) {
  .nav-logo-bubble,
  .nav-social-bubble {
    display: none !important;
  }
  
  .faq-grid {
    grid-template-columns: 1fr !important;
    gap: 0 !important;
  }
  
  /* Stats 2×2 grid on mobile */
  .stats-row {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 2.5rem 2rem !important;
    border-top: none !important;
    padding-top: 2rem !important;
  }
  
  .stat-item {
    border-left: none !important;
    padding-left: 0 !important;
  }
  
  /* About section single column on mobile */
  .about-grid {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
    margin-bottom: 3rem !important;
  }
  
  .about-body {
    padding-top: 0 !important;
  }
  
  /* Schedule single column on mobile */
  .schedule-grid {
    grid-template-columns: 1fr !important;
    gap: 3rem !important;
  }
  
  /* Hero title bigger on mobile */
  .hero-title {
    font-size: clamp(4.5rem, 15vw, 8rem) !important;
  }
  
  /* Hide extra stars on mobile (show 40 instead of 80) */
  .star-desktop-only {
    display: none !important;
  }
}

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
  height: 80px;
  min-height: 60px;
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

  // Set body background color for overscroll
  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = C.skyBot;
    document.documentElement.style.backgroundColor = C.skyBot;
    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      document.documentElement.style.backgroundColor = originalHtmlBg;
    };
  }, []);

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
        {/* ═══ NAVIGATION — two floating pills ═══ */}
        <div
          style={{
            position: "fixed",
            top: "1.25rem",
            left: 0,
            right: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* Logo bubble — left */}
          <a
            href="#"
            className="nav-logo-bubble"
            style={{
              position: "absolute",
              left: "2rem",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "1.3rem",
              color: C.coral,
              fontStyle: "italic",
              padding: "0.65rem 1.5rem",
              backdropFilter: "blur(16px) saturate(1.4)",
              WebkitBackdropFilter: "blur(16px) saturate(1.4)",
              background: `${C.surface}66`,
              border: `1px solid ${C.border}88`,
              borderRadius: "999px",
              boxShadow: `0 4px 30px ${C.ink}08, 0 1px 3px ${C.ink}06`,
              pointerEvents: "auto",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            hack.msa
          </a>

          {/* Nav links bubble — center */}
          <nav
            style={{
              display: "flex",
              gap: "2rem",
              padding: "0.75rem 2.5rem",
              backdropFilter: "blur(16px) saturate(1.4)",
              WebkitBackdropFilter: "blur(16px) saturate(1.4)",
              background: `${C.surface}66`,
              border: `1px solid ${C.border}88`,
              borderRadius: "999px",
              boxShadow: `0 4px 30px ${C.ink}08, 0 1px 3px ${C.ink}06`,
              pointerEvents: "auto",
            }}
          >
            {["About", "Schedule", "FAQ"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="nav-dawn"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social icons bubble — right */}
          <div
            className="nav-social-bubble"
            style={{
              position: "absolute",
              right: "2rem",
              display: "flex",
              gap: "0.75rem",
              padding: "0.65rem 1rem",
              backdropFilter: "blur(16px) saturate(1.4)",
              WebkitBackdropFilter: "blur(16px) saturate(1.4)",
              background: `${C.surface}66`,
              border: `1px solid ${C.border}88`,
              borderRadius: "999px",
              boxShadow: `0 4px 30px ${C.ink}08, 0 1px 3px ${C.ink}06`,
              pointerEvents: "auto",
            }}
          >
            {/* Instagram */}
            <a
              href="https://www.instagram.com/hack.msa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                color: C.coral,
                transition: "opacity 0.3s",
                opacity: 0.8,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Discord — greyed out with tooltip */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                color: C.muted,
                opacity: 0.4,
                cursor: "not-allowed",
              }}
              onMouseEnter={(e) => {
                const tooltip = e.currentTarget.querySelector('.discord-tooltip') as HTMLElement;
                if (tooltip) tooltip.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const tooltip = e.currentTarget.querySelector('.discord-tooltip') as HTMLElement;
                if (tooltip) tooltip.style.opacity = "0";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              {/* Tooltip */}
              <span
                className="discord-tooltip"
                style={{
                  position: "absolute",
                  bottom: "-2.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  background: C.ink,
                  color: C.surface,
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  pointerEvents: "none",
                  zIndex: 1000,
                }}
              >
                coming soon
              </span>
            </div>
          </div>
        </div>

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
          {/* ── 4-pointed star field (z-index 1, above gradient bg) ── */}
          <div className="dawn-stars">
            {stars.map((s, i) => (
              <svg
                key={i}
                className={`star-4 ${i >= 40 ? 'star-desktop-only' : ''}`}
                width={s.size}
                height={s.size}
                viewBox="0 0 24 24"
                fill={C.gold}
                style={
                  {
                    position: "absolute",
                    left: s.left,
                    top: s.top,
                    "--dur": s.dur,
                    "--delay": s.delay,
                    "--base-op": s.opacity,
                    "--rot": `${s.rotation}deg`,
                  } as React.CSSProperties
                }
              >
                <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
              </svg>
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
              borderTop: `1.5px solid ${C.coral}33`,
              borderLeft: `1.5px solid ${C.coral}33`,
              borderRight: `1.5px solid ${C.coral}33`,
              marginBottom: "2rem",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* Small decorative star */}
          <div className="dawn-rise dr-d1" style={{ marginBottom: "1.5rem", position: "relative", zIndex: 2 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 0L16 12L28 14L16 16L14 28L12 16L0 14L12 12L14 0Z"
                fill={C.coral}
                opacity="0.3"
              />
            </svg>
          </div>

          <h1
            className="dawn-rise dr-d1 hero-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: C.ink,
              marginBottom: "1.5rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            hack
            <span style={{ color: C.coral, fontStyle: "italic", marginLeft: "0.1em" }}>.msa</span>
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
              position: "relative",
              zIndex: 2,
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
              position: "relative",
              zIndex: 2,
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
            href="https://tally.so/r/OD5EQp?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaAP6PQVleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAacDomzsHP909x1Z_FRbvL8edD6CnOPYyt0492qc6l5NokRJfyAi1QfgvZbiEQ_aem_ja4QIfJQOO6O1FyN6jn7Yg"
            target="_blank"
            rel="noopener noreferrer"
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
              position: "relative",
              zIndex: 2,
            }}
          >
            Interest Form
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

        {/* Section divider — decorative line with star */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "3rem 2rem",
            background: C.surface,
          }}
        >
          <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: `linear-gradient(to right, transparent, ${C.coral}40)` }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill={C.coral} opacity={0.35}>
            <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
          </svg>
          <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: `linear-gradient(to left, transparent, ${C.coral}40)` }} />
        </div>

        {/* ═══════════════ ABOUT ═══════════════ */}
        <section
          id="about"
          style={{
            background: C.surface,
            padding: "6rem 2rem 5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            {/* Two-column editorial layout */}
            <div
              className="about-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
                alignItems: "start",
                marginBottom: "5rem",
              }}
            >
              {/* Left — headline */}
              <div>
                <span
                  style={{
                    fontFamily: "'Lora', serif",
                    fontStyle: "italic",
                    color: C.coral,
                    fontSize: "0.85rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  About the event
                </span>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: C.ink,
                    marginTop: "1rem",
                  }}
                >
                  UT Austin MSA&apos;s first-ever hackathon.
                </h2>
              </div>

              {/* Right — body text */}
              <div className="about-body" style={{ paddingTop: "2.5rem" }}>
                <p
                  style={{
                    color: C.inkSoft,
                    fontSize: "1.05rem",
                    lineHeight: 1.85,
                    marginBottom: "1.5rem",
                  }}
                >
                  A 24-hour sprint where Muslim students and allies
                  come together to build, learn, and innovate. Whether
                  you&apos;re a seasoned developer or writing your first
                  line of code — this is your launchpad.
                </p>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                  }}
                >
                  Workshops led by industry mentors. Prayer breaks baked
                  into the schedule. Free food, swag, and an
                  unforgettable community.
                </p>
              </div>
            </div>

            {/* Stats row — large numbers, horizontal on desktop, 2×2 on mobile */}
            <div
              className="stats-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: `1px solid ${C.border}`,
                paddingTop: "2.5rem",
              }}
            >
              {[
                { num: "24", label: "hours" },
                { num: "∞", label: "community" },
                { num: "250+", label: "hackers" },
                { num: "$4,000+", label: "in prizes" },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`stat-item stat-${i}`}
                  style={{
                    flex: 1,
                    borderLeft: i > 0 ? `1px solid ${C.border}` : "none",
                    paddingLeft: i > 0 ? "2rem" : "0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                      fontWeight: 900,
                      color: C.coral,
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Lora', serif",
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      color: C.muted,
                      marginTop: "0.4rem",
                      display: "block",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider — decorative line with star */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "3rem 2rem",
            background: C.surface,
          }}
        >
          <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: `linear-gradient(to right, transparent, ${C.coral}40)` }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill={C.coral} opacity={0.35}>
            <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
          </svg>
          <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: `linear-gradient(to left, transparent, ${C.coral}40)` }} />
        </div>

        {/* ═══════════════ SCHEDULE ═══════════════ */}

        {/* ═══════════════ SCHEDULE ═══════════════ */}
        <section
          id="schedule"
          style={{
            padding: "8rem 2rem 10rem",
            maxWidth: "1000px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Subtle geometric background for schedule area */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(${C.coral}08 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          {/* Section intro */}
          <div style={{ marginBottom: "5rem", textAlign: "center", position: "relative" }}>
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: C.coral,
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
              }}
            >
              The Journey
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: C.ink,
                marginTop: "1rem",
              }}
            >
              Schedule
            </h2>
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                opacity: 0.6,
              }}
            >
              {/* Decorative diamonds */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    background: C.gold,
                    transform: "rotate(45deg)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Days — Side by Side Arches */}
          <div
            className="schedule-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {Object.entries(SCHEDULE).map(([day, events], dayIdx) => (
              <div
                key={day}
                className="alhambra-arch"
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "12rem 12rem 0.5rem 0.5rem",
                  padding: "5rem 2.5rem 3rem",
                  position: "relative",
                  boxShadow: `0 20px 40px -10px ${C.ink}08`,
                  overflow: "hidden",
                }}
              >
                {/* Arch inner border decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    right: "12px",
                    bottom: "12px",
                    border: `1px dashed ${C.coral}33`,
                    borderRadius: "11.5rem 11.5rem 0.25rem 0.25rem",
                    pointerEvents: "none",
                  }}
                />

                {/* Day Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 2 }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900,
                      fontSize: "1.75rem",
                      color: C.ink,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {day.split(", ")[0]}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Lora', serif",
                      fontStyle: "italic",
                      color: C.coral,
                      fontSize: "1rem",
                    }}
                  >
                    {day.split(", ")[1]}
                  </span>
                </div>

                {/* Events List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative", zIndex: 2 }}>
                  {events.map((ev, i) => {
                    const isPrayer = (ev as { prayer?: boolean }).prayer;
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "1rem",
                          position: "relative",
                        }}
                      >
                        {/* Timeline Marker: 8-pointed star */}
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transform: "translateY(4px)", // align with text baseline roughly
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width={isPrayer ? "20" : "14"}
                            height={isPrayer ? "20" : "14"}
                            fill={isPrayer ? C.gold : C.coral}
                            style={{
                              opacity: isPrayer ? 1 : 0.6,
                              filter: isPrayer ? `drop-shadow(0 0 4px ${C.gold}66)` : "none",
                            }}
                          >
                            {/* Rub el Hizb (2 overlapping squares) */}
                            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
                          </svg>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontWeight: 700,
                              fontSize: "1rem",
                              color: isPrayer ? C.gold : C.ink,
                              marginBottom: "0.2rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            {ev.time}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Lora', serif",
                              fontSize: "0.95rem",
                              color: isPrayer ? C.inkSoft : C.muted,
                              lineHeight: 1.4,
                              fontWeight: isPrayer ? 600 : 400,
                            }}
                          >
                            {ev.event}
                          </div>
                        </div>

                        {/* Prayer Highlight Background (Optional, kept subtle) */}
                        {isPrayer && (
                          <div
                            style={{
                              position: "absolute",
                              inset: "-0.75rem -1rem",
                              background: `linear-gradient(to right, ${C.gold}11, transparent)`,
                              borderRadius: "4px",
                              zIndex: -1,
                              borderLeft: `3px solid ${C.gold}44`,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "4rem",
              textAlign: "center",
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
              fontSize: "0.85rem",
              color: C.muted,
              opacity: 0.7,
            }}
          >
            *Schedule subject to change
          </p>
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
          <div style={{ maxWidth: "920px", margin: "0 auto" }}>
            {/* Section intro */}
            <div style={{ marginBottom: "5rem" }}>
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  color: C.coral,
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                }}
              >
                Everything you need to know
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: C.ink,
                  marginTop: "1rem",
                }}
              >
                Questions & Answers
              </h2>
            </div>

            {/* Q&A accordion — two-column grid */}
            <div
              className="faq-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 4rem",
              }}
            >
              {FAQ.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: i === 0 ? `1px solid ${C.border}` : "none",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {/* Question button */}
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    style={{
                      width: "100%",
                      padding: "1.75rem 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: "2rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: "1.15rem",
                        lineHeight: 1.35,
                        color: C.ink,
                        flex: 1,
                      }}
                    >
                      {item.q}
                    </h3>
                    {/* Indicator — small circle with + */}
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: `1px solid ${openFAQ === i ? C.coral : C.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                        flexShrink: 0,
                        background: openFAQ === i ? `${C.coral}08` : "transparent",
                      }}
                    >
                      <span
                        style={{
                          color: openFAQ === i ? C.coral : C.muted,
                          fontSize: "1.2rem",
                          fontWeight: 300,
                          lineHeight: 1,
                          transition: "transform 0.3s",
                          transform: openFAQ === i ? "rotate(45deg)" : "rotate(0)",
                          display: "block",
                        }}
                      >
                        +
                      </span>
                    </div>
                  </button>

                  {/* Answer — collapsible */}
                  <div
                    className={`faq-dawn-body ${openFAQ === i ? "open" : ""}`}
                  >
                    <p
                      style={{
                        fontFamily: "'Lora', serif",
                        color: C.inkSoft,
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                        paddingBottom: "1.75rem",
                        paddingRight: "3rem",
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
        {/* <section
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
        </section> */}

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
