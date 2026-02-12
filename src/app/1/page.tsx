"use client";

import { useState } from "react";

/* ───────── palette ───────── */
const C = {
  bg: "#0b0a1a",
  surface: "#12112a",
  accent: "#d4a843",
  accentDim: "#a07c2e",
  purple: "#6b3fa0",
  purpleGlow: "#9d6fdf",
  text: "#e8e4f0",
  muted: "#8a84a0",
  border: "#1f1d3a",
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

/* ───────── stars background CSS ───────── */
const starsCSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

.star-field {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.star-field .star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  animation: twinkle var(--dur) ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.2; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.3); }
}

@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0.6; }
  100% { transform: translateY(-30px) scale(1.1); opacity: 0.3; }
}

@keyframes glow-pulse {
  0%, 100% { filter: blur(40px) brightness(1); }
  50% { filter: blur(50px) brightness(1.3); }
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  animation: glow-pulse 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  animation: fade-in-up 0.8s ease-out both;
}

.fade-delay-1 { animation-delay: 0.15s; }
.fade-delay-2 { animation-delay: 0.3s; }
.fade-delay-3 { animation-delay: 0.45s; }
.fade-delay-4 { animation-delay: 0.6s; }
.fade-delay-5 { animation-delay: 0.75s; }

@keyframes hero-title {
  from { opacity: 0; transform: translateY(60px) scale(0.95); filter: blur(8px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.hero-title-anim {
  animation: hero-title 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes subtle-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.geometric-spin {
  animation: subtle-rotate 120s linear infinite;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s ease;
  padding: 0 1.5rem;
}

.faq-answer.open {
  max-height: 300px;
  padding: 0 1.5rem 1.5rem;
}

.nav-link {
  position: relative;
  color: ${C.muted};
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.3s;
}

.nav-link:hover { color: ${C.accent}; }

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: ${C.accent};
  transition: width 0.3s;
}

.nav-link:hover::after { width: 100%; }

.sponsor-card {
  border: 1px solid ${C.border};
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${C.surface};
  transition: all 0.3s;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${C.muted};
  letter-spacing: 0.02em;
}

.sponsor-card:hover {
  border-color: ${C.accent};
  color: ${C.accent};
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(212, 168, 67, 0.1);
}
`;

function generateStars(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      dur: `${2 + Math.random() * 4}s`,
      delay: `${Math.random() * 5}s`,
      size: `${1 + Math.random() * 2}px`,
    });
  }
  return stars;
}

const stars = generateStars(150);

export default function Design1() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: starsCSS }} />
      <div
        style={{
          background: C.bg,
          color: C.text,
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Star Field */}
        <div className="star-field">
          {stars.map((s, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
                "--dur": s.dur,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Glow Orbs */}
        <div
          className="glow-orb"
          style={{
            width: 600,
            height: 600,
            background: `radial-gradient(circle, ${C.purple}33, transparent 70%)`,
            top: "-200px",
            right: "-200px",
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${C.accent}22, transparent 70%)`,
            bottom: "10%",
            left: "-150px",
            animationDelay: "3s",
          }}
        />

        {/* Geometric Background Pattern */}
        <div
          className="geometric-spin"
          style={{
            position: "fixed",
            width: "800px",
            height: "800px",
            top: "50%",
            left: "50%",
            marginLeft: "-400px",
            marginTop: "-400px",
            opacity: 0.03,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <svg viewBox="0 0 800 800" fill="none">
            {/* 8-pointed star pattern */}
            {[0, 45, 90, 135].map((rot) => (
              <rect
                key={rot}
                x="300"
                y="300"
                width="200"
                height="200"
                stroke={C.accent}
                strokeWidth="1"
                transform={`rotate(${rot} 400 400)`}
              />
            ))}
            <circle
              cx="400"
              cy="400"
              r="200"
              stroke={C.accent}
              strokeWidth="0.5"
            />
            <circle
              cx="400"
              cy="400"
              r="280"
              stroke={C.accent}
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Navigation */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "1.25rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(20px)",
            background: `${C.bg}cc`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: C.accent,
              letterSpacing: "-0.02em",
            }}
          >
            hack.msa
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["About", "Schedule", "FAQ", "Sponsors"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="nav-link"
              >
                {link}
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
            padding: "6rem 2rem 4rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Decorative star above title */}
          <div
            className="fade-in-up"
            style={{
              marginBottom: "2rem",
              opacity: 0.6,
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M20 0L23.5 16.5L40 20L23.5 23.5L20 40L16.5 23.5L0 20L16.5 16.5L20 0Z"
                fill={C.accent}
              />
            </svg>
          </div>

          <h1
            className="hero-title-anim"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              background: `linear-gradient(135deg, ${C.text}, ${C.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1.5rem",
            }}
          >
            hack.msa
          </h1>

          <p
            className="fade-in-up fade-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
              color: C.muted,
              maxWidth: "500px",
              lineHeight: 1.6,
              fontStyle: "italic",
              marginBottom: "2.5rem",
            }}
          >
            Inspiring the next generation of Muslim builders
          </p>

          <div
            className="fade-in-up fade-delay-3"
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              marginBottom: "3rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "0.6rem 1.5rem",
                border: `1px solid ${C.accent}44`,
                borderRadius: "100px",
                fontSize: "0.95rem",
                color: C.accent,
                letterSpacing: "0.03em",
              }}
            >
              April 18–19, 2026
            </div>
            <div
              style={{
                padding: "0.6rem 1.5rem",
                border: `1px solid ${C.border}`,
                borderRadius: "100px",
                fontSize: "0.95rem",
                color: C.muted,
                letterSpacing: "0.03em",
              }}
            >
              UT Austin
            </div>
          </div>

          <a
            href="#about"
            className="fade-in-up fade-delay-4"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentDim})`,
              color: C.bg,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "100px",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: `0 4px 24px ${C.accent}33`,
            }}
          >
            Register Now
          </a>

          {/* Scroll indicator */}
          <div
            className="fade-in-up fade-delay-5"
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              color: C.muted,
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span>Scroll</span>
            <div
              style={{
                width: "1px",
                height: "40px",
                background: `linear-gradient(to bottom, ${C.muted}, transparent)`,
              }}
            />
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section
          id="about"
          style={{
            padding: "8rem 2rem",
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                display: "inline-block",
                color: C.accent,
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                fontWeight: 500,
              }}
            >
              About
            </span>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
              }}
            >
              Where Faith
              <br />
              <span style={{ color: C.accent }}>Meets Innovation</span>
            </h2>
            <p
              style={{
                color: C.muted,
                fontSize: "1.1rem",
                lineHeight: 1.8,
                maxWidth: "650px",
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
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                icon: "🌙",
                title: "24 Hours",
                desc: "Of building, learning, and creating something extraordinary",
              },
              {
                icon: "🤝",
                title: "Community",
                desc: "Connect with Muslim builders and allies from across Texas",
              },
              {
                icon: "🎓",
                title: "Workshops",
                desc: "Learn from industry professionals and experienced mentors",
              },
              {
                icon: "🏆",
                title: "Prizes",
                desc: "Win prizes across multiple categories and tracks",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  padding: "2rem",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "16px",
                  transition: "all 0.3s",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                  {card.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
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
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                display: "inline-block",
                color: C.accent,
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                fontWeight: 500,
              }}
            >
              Schedule
            </span>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              The <span style={{ color: C.accent }}>Timeline</span>
            </h2>
          </div>

          {Object.entries(SCHEDULE).map(([day, events]) => (
            <div key={day} style={{ marginBottom: "3rem" }}>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {day}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {events.map((ev, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      padding: "1rem 0",
                      borderBottom:
                        i < events.length - 1
                          ? `1px solid ${C.border}44`
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: C.accent,
                        minWidth: "90px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {ev.time}
                    </span>
                    <span
                      style={{
                        fontSize: "1rem",
                        color: (ev as { prayer?: boolean }).prayer
                          ? C.purpleGlow
                          : C.text,
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
            </div>
          ))}
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
            <span
              style={{
                display: "inline-block",
                color: C.accent,
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                fontWeight: 500,
              }}
            >
              FAQ
            </span>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Questions? <span style={{ color: C.accent }}>Answered.</span>
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {FAQ.map((item, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${openFAQ === i ? C.accent + "44" : C.border}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: openFAQ === i ? C.surface : "transparent",
                  transition: "all 0.3s",
                }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.text,
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    textAlign: "left",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.q}
                  <span
                    style={{
                      color: C.accent,
                      fontSize: "1.4rem",
                      transform:
                        openFAQ === i ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.3s",
                      flexShrink: 0,
                      marginLeft: "1rem",
                    }}
                  >
                    +
                  </span>
                </button>
                <div className={`faq-answer ${openFAQ === i ? "open" : ""}`}>
                  <p
                    style={{
                      color: C.muted,
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SPONSORS ═══ */}
        <section
          id="sponsors"
          style={{
            padding: "8rem 2rem",
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                display: "inline-block",
                color: C.accent,
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                fontWeight: 500,
              }}
            >
              Partners
            </span>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Our <span style={{ color: C.accent }}>Sponsors</span>
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
              <div key={s} className="sponsor-card">
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
            position: "relative",
            zIndex: 1,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: C.accent,
              marginBottom: "1rem",
            }}
          >
            hack.msa
          </div>
          <p style={{ color: C.muted, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            UT Austin MSA&apos;s First-Ever Hackathon
          </p>
          <p style={{ color: C.muted, fontSize: "0.8rem", opacity: 0.6 }}>
            April 18–19, 2026 · Austin, TX
          </p>
        </footer>
      </div>
    </>
  );
}

