"use client";

import { useState } from "react";

/* ───────── palette ───────── */
const C = {
  cream: "#faf3e8",
  sand: "#e8d5b8",
  terracotta: "#c2703e",
  amber: "#d4a843",
  darkBrown: "#2d1810",
  warmBlack: "#1a110a",
  clay: "#8b5e3c",
  dusty: "#a89078",
  softWhite: "#fff8f0",
  rose: "#d4856a",
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

const FAQ = [
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

const SPONSORS = ["Emerge", "UT MSA", "Google", "GitHub", "Vercel", "MongoDB"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

@keyframes drift {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -20px) rotate(2deg); }
  66% { transform: translate(-20px, 15px) rotate(-1deg); }
}

@keyframes wave-slow {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.desert-blob {
  animation: drift 20s ease-in-out infinite;
  pointer-events: none;
}

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

.faq-item {
  border-bottom: 1px solid ${C.sand};
  transition: background 0.3s;
}

.faq-item:hover {
  background: ${C.sand}33;
}

.faq-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-body.open {
  max-height: 300px;
}

.schedule-item {
  position: relative;
  padding-left: 2.5rem;
}

.schedule-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: ${C.terracotta};
  border: 2px solid ${C.cream};
  box-shadow: 0 0 0 2px ${C.terracotta};
}

.schedule-item.prayer::before {
  background: ${C.amber};
  box-shadow: 0 0 0 2px ${C.amber};
}

.schedule-line {
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${C.sand};
}

.sponsor-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 2rem;
  border: 2px solid ${C.sand};
  border-radius: 999px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1rem;
  color: ${C.clay};
  transition: all 0.3s;
  background: transparent;
}

.sponsor-badge:hover {
  border-color: ${C.terracotta};
  color: ${C.terracotta};
  background: ${C.terracotta}0a;
  transform: translateY(-2px);
}

.nav-desert {
  text-decoration: none;
  color: ${C.clay};
  font-family: 'Lora', serif;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  transition: color 0.3s;
  font-weight: 500;
}

.nav-desert:hover {
  color: ${C.terracotta};
}

.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

@keyframes hero-reveal {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero-reveal {
  animation: hero-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.hero-reveal-d1 { animation-delay: 0.2s; }
.hero-reveal-d2 { animation-delay: 0.4s; }
.hero-reveal-d3 { animation-delay: 0.6s; }
`;

export default function Design2() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          background: C.cream,
          color: C.warmBlack,
          fontFamily: "'Lora', serif",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div className="grain-overlay" />

        {/* Decorative floating blobs */}
        <div
          className="desert-blob"
          style={{
            position: "fixed",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.terracotta}15, transparent 70%)`,
            top: "-100px",
            right: "-100px",
            zIndex: 0,
          }}
        />
        <div
          className="desert-blob"
          style={{
            position: "fixed",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.amber}12, transparent 70%)`,
            bottom: "10%",
            left: "-100px",
            zIndex: 0,
            animationDelay: "7s",
          }}
        />

        {/* Navigation */}
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
            background: `${C.cream}dd`,
            borderBottom: `1px solid ${C.sand}88`,
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
            {["About", "Schedule", "FAQ", "Sponsors"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="nav-desert"
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
          {/* Decorative arc */}
          <div
            className="hero-reveal"
            style={{
              width: 80,
              height: 40,
              borderRadius: "80px 80px 0 0",
              border: `2px solid ${C.terracotta}44`,
              borderBottom: "none",
              marginBottom: "2rem",
            }}
          />

          <h1
            className="hero-reveal hero-reveal-d1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: C.warmBlack,
              marginBottom: "1.5rem",
            }}
          >
            hack
            <span style={{ color: C.terracotta, fontStyle: "italic" }}>
              .msa
            </span>
          </h1>

          <p
            className="hero-reveal hero-reveal-d2"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              fontStyle: "italic",
              color: C.clay,
              maxWidth: "420px",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Inspiring the next generation of Muslim builders
          </p>

          <div
            className="hero-reveal hero-reveal-d3"
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
            <span style={{ color: C.sand, fontSize: "1.5rem" }}>·</span>
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
            className="hero-reveal hero-reveal-d3"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              background: C.terracotta,
              color: C.cream,
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "4px",
              textDecoration: "none",
              letterSpacing: "0.03em",
              transition: "all 0.3s",
              boxShadow: `0 4px 20px ${C.terracotta}33`,
            }}
          >
            Register Now
          </a>

          {/* Decorative bottom element */}
          <div
            style={{
              position: "absolute",
              bottom: "3rem",
              display: "flex",
              gap: "6px",
              alignItems: "flex-end",
            }}
          >
            {[20, 30, 40, 30, 20].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "2px",
                  height: `${h}px`,
                  background: C.sand,
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>
        </section>

        {/* Wave divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z"
              fill={C.softWhite}
            />
          </svg>
        </div>

        {/* ═══ ABOUT ═══ */}
        <section
          id="about"
          style={{
            background: C.softWhite,
            padding: "6rem 2rem 8rem",
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
                  color: C.warmBlack,
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
                  color: C.clay,
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
                gap: "2rem",
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
                <div
                  key={i}
                  style={{
                    padding: "2.5rem 2rem",
                    border: `1px solid ${C.sand}`,
                    borderRadius: "2px",
                    textAlign: "center",
                    background: C.cream,
                    transition: "all 0.3s",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      color: C.terracotta,
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
                      color: C.warmBlack,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {c.label}
                  </div>
                  <p style={{ color: C.dusty, fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave divider back */}
        <div className="wave-divider" style={{ transform: "scaleY(-1)" }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,20 1440,40 L1440,80 L0,80 Z"
              fill={C.softWhite}
            />
          </svg>
        </div>

        {/* ═══ SCHEDULE ═══ */}
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
                color: C.warmBlack,
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
                <div className="schedule-line" />
                {events.map((ev, i) => (
                  <div
                    key={i}
                    className={`schedule-item ${(ev as { prayer?: boolean }).prayer ? "prayer" : ""}`}
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
                          : C.warmBlack,
                        fontStyle: (ev as { prayer?: boolean }).prayer
                          ? "italic"
                          : "normal",
                      }}
                    >
                      {ev.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ═══ FAQ ═══ */}
        <section
          id="faq"
          style={{
            background: C.softWhite,
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
                  color: C.warmBlack,
                }}
              >
                Common <em style={{ color: C.terracotta }}>Questions</em>
              </h2>
            </div>

            <div>
              {FAQ.map((item, i) => (
                <div key={i} className="faq-item">
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
                      color: C.warmBlack,
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
                  <div className={`faq-body ${openFAQ === i ? "open" : ""}`}>
                    <p
                      style={{
                        color: C.clay,
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

        {/* ═══ SPONSORS ═══ */}
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
                color: C.warmBlack,
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
              <div key={s} className="sponsor-badge">
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
            borderTop: `1px solid ${C.sand}`,
            position: "relative",
            zIndex: 1,
          }}
        >
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
          <p style={{ color: C.dusty, fontSize: "0.85rem", marginBottom: "0.25rem" }}>
            UT Austin MSA&apos;s First-Ever Hackathon
          </p>
          <p style={{ color: C.dusty, fontSize: "0.8rem", opacity: 0.6 }}>
            April 18–19, 2026 · Austin, TX
          </p>
        </footer>
      </div>
    </>
  );
}

