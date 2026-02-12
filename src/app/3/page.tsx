"use client";

import { useState } from "react";

const C = {
  yellow: "#FFE600",
  pink: "#FF2D6A",
  cyan: "#00E5FF",
  lime: "#BFFF00",
  black: "#0a0a0a",
  white: "#ffffff",
  offWhite: "#f5f5f0",
};

const SCHEDULE = {
  "FRI APR 18": [
    { time: "4 PM", event: "DOORS OPEN", tag: "start" },
    { time: "5 PM", event: "OPENING CEREMONY", tag: "main" },
    { time: "6 PM", event: "TEAM FORMATION", tag: "main" },
    { time: "6:30 PM", event: "MAGHRIB PRAYER ☪", tag: "prayer" },
    { time: "7 PM", event: "HACKING BEGINS!!!", tag: "main" },
    { time: "8:30 PM", event: "ISHA PRAYER ☪", tag: "prayer" },
    { time: "9 PM", event: "WORKSHOP: AI", tag: "workshop" },
    { time: "11 PM", event: "LATE NITE SNACKS", tag: "food" },
  ],
  "SAT APR 19": [
    { time: "6 AM", event: "FAJR PRAYER ☪", tag: "prayer" },
    { time: "8 AM", event: "BREAKFAST", tag: "food" },
    { time: "12 PM", event: "DHUHR + LUNCH ☪", tag: "prayer" },
    { time: "1 PM", event: "HACKING ENDS", tag: "main" },
    { time: "1:30 PM", event: "PROJECT DEMOS", tag: "main" },
    { time: "3:30 PM", event: "ASR PRAYER ☪", tag: "prayer" },
    { time: "4 PM", event: "AWARDS CEREMONY", tag: "main" },
  ],
};

const FAQ = [
  { q: "WHAT IS HACK.MSA?", a: "UT Austin MSA's FIRST EVER hackathon. 24 hours of building, learning, and vibing with the Muslim tech community." },
  { q: "WHO CAN JOIN?", a: "ANY college student. You don't need to be from UT or Muslim. Everyone's invited to the party." },
  { q: "DO I NEED TO KNOW HOW TO CODE?", a: "NOPE! Total beginners welcome. We've got workshops and mentors to help you go from zero to demo." },
  { q: "WHAT DO I BRING?", a: "Laptop + charger + energy. We handle the rest: food, swag, WiFi, good vibes." },
  { q: "IS IT FREE?", a: "100% FREE. Food, merch, prizes — all on us." },
  { q: "TEAM SIZE?", a: "1-4 people. Flying solo? We'll match you at the event." },
  { q: "IS THE FOOD HALAL?", a: "Obviously. All food is halal. Other dietary needs? We got you." },
  { q: "PRAYER TIMES?", a: "Built into the schedule. Dedicated prayer space on-site. We planned for it." },
];

const SPONSORS = ["EMERGE", "UT MSA", "GOOGLE", "GITHUB", "VERCEL", "MONGODB"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

@keyframes shake {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
}

@keyframes bounce-brutal {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
}

.sticker {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  border: 3px solid ${C.black};
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.05em;
  transform: rotate(-2deg);
  transition: all 0.15s;
  cursor: default;
}

.sticker:hover {
  transform: rotate(2deg) scale(1.1);
  animation: shake 0.3s ease-in-out;
}

.brutal-card {
  border: 3px solid ${C.black};
  background: ${C.white};
  padding: 1.5rem;
  box-shadow: 6px 6px 0 ${C.black};
  transition: all 0.15s;
}

.brutal-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 ${C.black};
}

.brutal-btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 3px solid ${C.black};
  background: ${C.yellow};
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.08em;
  color: ${C.black};
  text-decoration: none;
  box-shadow: 5px 5px 0 ${C.black};
  transition: all 0.1s;
  cursor: pointer;
}

.brutal-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 ${C.black};
}

.brutal-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 ${C.black};
}

.faq-brutal {
  border: 3px solid ${C.black};
  margin-bottom: -3px;
  overflow: hidden;
  transition: background 0.15s;
}

.faq-brutal:hover {
  background: ${C.yellow}22;
}

.faq-brutal-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-brutal-body.open {
  max-height: 200px;
}

.tag-prayer { background: ${C.cyan}; }
.tag-main { background: ${C.yellow}; }
.tag-workshop { background: ${C.lime}; }
.tag-food { background: ${C.pink}; color: ${C.white}; }
.tag-start { background: ${C.white}; }

.nav-brutal {
  text-decoration: none;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: ${C.black};
  padding: 0.4rem 0.8rem;
  border: 2px solid transparent;
  transition: all 0.1s;
}

.nav-brutal:hover {
  border-color: ${C.black};
  background: ${C.yellow};
}

.sponsor-brutal {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2rem;
  border: 3px solid ${C.black};
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 0.08em;
  box-shadow: 4px 4px 0 ${C.black};
  transition: all 0.15s;
  background: ${C.white};
}

.sponsor-brutal:hover {
  transform: translate(-2px, -2px) rotate(-1deg);
  box-shadow: 6px 6px 0 ${C.black};
}

@keyframes hero-slam {
  0% { transform: scale(3) rotate(-10deg); opacity: 0; }
  60% { transform: scale(0.95) rotate(1deg); opacity: 1; }
  80% { transform: scale(1.05) rotate(-0.5deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.hero-slam {
  animation: hero-slam 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slide-up-brutal {
  from { transform: translateY(100px) rotate(3deg); opacity: 0; }
  to { transform: translateY(0) rotate(0deg); opacity: 1; }
}

.slide-up-b { animation: slide-up-brutal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.slide-up-b-d1 { animation-delay: 0.15s; }
.slide-up-b-d2 { animation-delay: 0.3s; }
.slide-up-b-d3 { animation-delay: 0.45s; }
`;

const tagColor = (tag: string) => {
  switch (tag) {
    case "prayer": return C.cyan;
    case "main": return C.yellow;
    case "workshop": return C.lime;
    case "food": return C.pink;
    default: return C.white;
  }
};

export default function Design3() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          background: C.offWhite,
          color: C.black,
          fontFamily: "'JetBrains Mono', monospace",
          minHeight: "100vh",
        }}
      >
        {/* Nav */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: C.yellow,
            borderBottom: `3px solid ${C.black}`,
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            HACK.MSA
          </span>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {["ABOUT", "SCHEDULE", "FAQ", "SPONSORS"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="nav-brutal"
              >
                {l}
              </a>
            ))}
          </div>
        </nav>

        {/* Marquee */}
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            zIndex: 99,
            background: C.black,
            padding: "0.5rem 0",
            overflow: "hidden",
            borderBottom: `3px solid ${C.black}`,
          }}
        >
          <div className="marquee-track">
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "0.9rem",
                    color: C.yellow,
                    letterSpacing: "0.15em",
                    padding: "0 2rem",
                  }}
                >
                  APRIL 18–19 ★ UT AUSTIN ★ FREE ENTRY ★ HALAL FOOD ★ PRIZES
                  ★ WORKSHOPS ★
                </span>
              ))}
          </div>
        </div>

        {/* ═══ HERO ═══ */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "8rem 2rem 4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decorations */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "5%",
              width: "200px",
              height: "200px",
              background: C.cyan,
              borderRadius: "50%",
              opacity: 0.15,
              transform: "rotate(12deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "8%",
              width: "150px",
              height: "150px",
              background: C.pink,
              opacity: 0.15,
              transform: "rotate(-8deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              right: "15%",
              width: "100px",
              height: "100px",
              background: C.lime,
              borderRadius: "50%",
              opacity: 0.12,
            }}
          />

          {/* Stickers floating around */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "8%",
              transform: "rotate(-12deg)",
            }}
          >
            <div
              className="sticker"
              style={{ background: C.cyan }}
            >
              24 HOURS
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "25%",
              right: "10%",
              transform: "rotate(8deg)",
            }}
          >
            <div
              className="sticker"
              style={{ background: C.pink, color: C.white }}
            >
              FREE ENTRY
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "25%",
              left: "12%",
              transform: "rotate(5deg)",
            }}
          >
            <div
              className="sticker"
              style={{ background: C.lime }}
            >
              UT AUSTIN
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "30%",
              right: "12%",
              transform: "rotate(-6deg)",
            }}
          >
            <div
              className="sticker"
              style={{ background: C.yellow }}
            >
              HALAL FOOD
            </div>
          </div>

          <h1
            className="hero-slam"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(5rem, 15vw, 12rem)",
              lineHeight: 0.85,
              letterSpacing: "0.02em",
              position: "relative",
              zIndex: 2,
            }}
          >
            HACK
            <br />
            <span
              style={{
                color: C.white,
                WebkitTextStroke: `3px ${C.black}`,
                paintOrder: "stroke fill",
              }}
            >
              .MSA
            </span>
          </h1>

          <p
            className="slide-up-b slide-up-b-d1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
              fontWeight: 600,
              maxWidth: "500px",
              lineHeight: 1.6,
              marginTop: "1.5rem",
              marginBottom: "2.5rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            INSPIRING THE NEXT GENERATION
            <br />
            OF MUSLIM BUILDERS_
          </p>

          <div className="slide-up-b slide-up-b-d2" style={{ position: "relative", zIndex: 2 }}>
            <a href="#about" className="brutal-btn">
              REGISTER NOW →
            </a>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section
          id="about"
          style={{
            background: C.black,
            color: C.white,
            padding: "6rem 2rem",
            borderTop: `3px solid ${C.black}`,
            borderBottom: `3px solid ${C.black}`,
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "0.05em",
                marginBottom: "2rem",
                lineHeight: 1,
              }}
            >
              WTF IS{" "}
              <span
                style={{
                  color: C.black,
                  background: C.yellow,
                  padding: "0 0.3rem",
                  display: "inline-block",
                  transform: "rotate(-1deg)",
                }}
              >
                HACK.MSA
              </span>
              ?
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: "600px",
                opacity: 0.8,
              }}
            >
              UT Austin MSA&apos;s FIRST EVER hackathon. 24 hours. One mission:
              build something incredible. Whether you&apos;re a coding wizard or
              a total noob, pull up and let&apos;s make something happen.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginTop: "3rem",
              }}
            >
              {[
                { label: "24H", desc: "NON-STOP BUILDING", bg: C.yellow, color: C.black },
                { label: "FREE", desc: "ZERO COST TO YOU", bg: C.cyan, color: C.black },
                { label: "4+", desc: "WORKSHOPS", bg: C.lime, color: C.black },
                { label: "$$$", desc: "IN PRIZES", bg: C.pink, color: C.white },
              ].map((c, i) => (
                <div
                  key={i}
                  className="brutal-card"
                  style={{
                    background: c.bg,
                    color: c.color,
                    textAlign: "center",
                    border: `3px solid ${C.black}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "3rem",
                      lineHeight: 1,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      marginTop: "0.25rem",
                    }}
                  >
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SCHEDULE ═══ */}
        <section
          id="schedule"
          style={{
            padding: "6rem 2rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "0.05em",
              marginBottom: "3rem",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            THE{" "}
            <span
              style={{
                background: C.pink,
                color: C.white,
                padding: "0 0.3rem",
                display: "inline-block",
              }}
            >
              SCHEDULE
            </span>
          </h2>

          {Object.entries(SCHEDULE).map(([day, events]) => (
            <div key={day} style={{ marginBottom: "2.5rem" }}>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.1em",
                  marginBottom: "1rem",
                  padding: "0.5rem 1rem",
                  background: C.black,
                  color: C.white,
                  display: "inline-block",
                }}
              >
                {day}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                {events.map((ev, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.75rem 1rem",
                      borderBottom: `2px solid ${C.black}`,
                      borderLeft: `2px solid ${C.black}`,
                      borderRight: `2px solid ${C.black}`,
                      ...(i === 0
                        ? { borderTop: `2px solid ${C.black}` }
                        : {}),
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        minWidth: "75px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {ev.time}
                    </span>
                    <span
                      className={`tag-${ev.tag}`}
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.75rem",
                        padding: "0.15rem 0.5rem",
                        border: `2px solid ${C.black}`,
                        letterSpacing: "0.08em",
                        background: tagColor(ev.tag),
                        color: ev.tag === "food" ? C.white : C.black,
                      }}
                    >
                      {ev.tag.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.15rem",
                        letterSpacing: "0.05em",
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
            background: C.yellow,
            padding: "6rem 2rem",
            borderTop: `3px solid ${C.black}`,
            borderBottom: `3px solid ${C.black}`,
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "0.05em",
                marginBottom: "2.5rem",
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              GOT{" "}
              <span
                style={{
                  background: C.black,
                  color: C.yellow,
                  padding: "0 0.3rem",
                  display: "inline-block",
                  transform: "rotate(1deg)",
                }}
              >
                QUESTIONS
              </span>
              ?
            </h2>

            {FAQ.map((item, i) => (
              <div key={i} className="faq-brutal">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: openFAQ === i ? C.black : "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: openFAQ === i ? C.yellow : C.black,
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.2rem",
                    letterSpacing: "0.05em",
                    textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  {item.q}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      transform:
                        openFAQ === i ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.15s",
                      flexShrink: 0,
                      marginLeft: "1rem",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`faq-brutal-body ${openFAQ === i ? "open" : ""}`}
                >
                  <p
                    style={{
                      padding: "0 1.25rem 1.25rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                      fontWeight: 500,
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
            padding: "6rem 2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "0.05em",
              marginBottom: "2.5rem",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            BACKED{" "}
            <span
              style={{
                background: C.cyan,
                padding: "0 0.3rem",
                display: "inline-block",
                transform: "rotate(-1deg)",
              }}
            >
              BY
            </span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            {SPONSORS.map((s, i) => (
              <div
                key={s}
                className="sponsor-brutal"
                style={{
                  background: [C.yellow, C.cyan, C.lime, C.pink, C.white, C.yellow][i],
                  color: i === 3 ? C.white : C.black,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer
          style={{
            background: C.black,
            color: C.white,
            padding: "3rem 2rem",
            textAlign: "center",
            borderTop: `3px solid ${C.black}`,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              letterSpacing: "0.05em",
              marginBottom: "0.5rem",
            }}
          >
            HACK.MSA
          </div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              opacity: 0.6,
              letterSpacing: "0.05em",
            }}
          >
            UT AUSTIN MSA&apos;S FIRST HACKATHON — APR 18-19 2026 — AUSTIN TX
          </p>
        </footer>
      </div>
    </>
  );
}

