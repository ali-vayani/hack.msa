"use client";

import { useState } from "react";

const C = {
  black: "#0e0e0e",
  white: "#fafaf8",
  burnt: "#BF5700",
  gray: "#6b6b6b",
  lightGray: "#e8e8e4",
  faintGray: "#f2f2ef",
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

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

.editorial-link {
  text-decoration: none;
  color: ${C.gray};
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
}

.editorial-link:hover {
  color: ${C.burnt};
}

.editorial-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1px;
  background: ${C.burnt};
  transition: width 0.3s;
}

.editorial-link:hover::after {
  width: 100%;
}

.editorial-rule {
  width: 100%;
  height: 1px;
  background: ${C.lightGray};
  border: none;
}

.editorial-rule-thick {
  width: 100%;
  height: 2px;
  background: ${C.black};
  border: none;
}

.faq-editorial {
  border-bottom: 1px solid ${C.lightGray};
}

.faq-editorial-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-editorial-body.open {
  max-height: 250px;
}

@keyframes editorial-reveal {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.editorial-reveal {
  animation: editorial-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.ed-d1 { animation-delay: 0.1s; }
.ed-d2 { animation-delay: 0.2s; }
.ed-d3 { animation-delay: 0.35s; }
.ed-d4 { animation-delay: 0.5s; }
.ed-d5 { animation-delay: 0.65s; }

.sponsor-editorial {
  padding: 1.5rem 2rem;
  border: 1px solid ${C.lightGray};
  text-align: center;
  font-family: 'Instrument Sans', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: ${C.gray};
  letter-spacing: 0.05em;
  transition: all 0.3s;
}

.sponsor-editorial:hover {
  border-color: ${C.burnt};
  color: ${C.burnt};
}

.schedule-editorial-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${C.lightGray};
  align-items: baseline;
}

.schedule-editorial-row:last-child {
  border-bottom: none;
}
`;

export default function Design4() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          background: C.white,
          color: C.black,
          fontFamily: "'Instrument Sans', sans-serif",
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
            padding: "1.5rem 3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: `${C.white}ee`,
            backdropFilter: "blur(20px)",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              color: C.black,
            }}
          >
            hack.msa
          </span>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {["About", "Schedule", "FAQ", "Sponsors"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="editorial-link"
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
            padding: "8rem 3rem 6rem",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* Top editorial header bar */}
          <div
            className="editorial-reveal"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.gray,
                fontWeight: 500,
              }}
            >
              UT Austin · Muslim Students Association
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.gray,
                fontWeight: 500,
              }}
            >
              April 18–19, 2026
            </span>
          </div>

          <hr className="editorial-rule-thick editorial-reveal ed-d1" />

          <div
            className="editorial-reveal ed-d2"
            style={{
              width: "100%",
              padding: "4rem 0",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: C.black,
                margin: 0,
              }}
            >
              hack
              <span style={{ fontWeight: 700, fontStyle: "italic", color: C.burnt }}>
                .msa
              </span>
            </h1>
          </div>

          <hr className="editorial-rule editorial-reveal ed-d3" />

          <div
            className="editorial-reveal ed-d4"
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "3rem",
              alignItems: "center",
              padding: "2rem 0",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem",
                fontStyle: "italic",
                color: C.gray,
                lineHeight: 1.5,
                textAlign: "right",
              }}
            >
              Inspiring the next
              <br />
              generation of Muslim builders
            </p>
            <div
              style={{
                width: "1px",
                height: "60px",
                background: C.lightGray,
              }}
            />
            <div>
              <a
                href="#about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.9rem 2rem",
                  background: C.burnt,
                  color: C.white,
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
              >
                Register Now
                <span style={{ fontSize: "1.1rem" }}>→</span>
              </a>
            </div>
          </div>

          <hr className="editorial-rule editorial-reveal ed-d5" />

          {/* Issue info line */}
          <div
            className="editorial-reveal ed-d5"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              padding: "1.5rem 0",
              fontSize: "0.7rem",
              color: C.gray,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            <span>Inaugural Edition</span>
            <span>·</span>
            <span>Austin, Texas</span>
            <span>·</span>
            <span>24 Hours</span>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" style={{ background: C.faintGray }}>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              padding: "8rem 3rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                gap: "4rem",
                alignItems: "start",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: C.burnt,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  About the Event
                </span>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "3rem",
                    fontWeight: 600,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Where Faith
                  <br />
                  Meets <em style={{ color: C.burnt }}>Code</em>
                </h2>
              </div>
              <div style={{ paddingTop: "0.5rem" }}>
                <p
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.9,
                    color: C.gray,
                    marginBottom: "2rem",
                  }}
                >
                  hack.msa is UT Austin MSA&apos;s inaugural hackathon — a
                  24-hour sprint where Muslim students and allies come together
                  to build, learn, and innovate. Whether you&apos;re a seasoned
                  developer or writing your first line of code, this is your
                  launchpad.
                </p>
                <p
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.9,
                    color: C.gray,
                  }}
                >
                  We believe the Muslim community has an extraordinary capacity
                  for innovation — and this hackathon is where that potential
                  becomes tangible. Join us for workshops, mentorship, halal food,
                  prayer breaks, and the chance to build something meaningful.
                </p>
              </div>
            </div>

            <hr
              className="editorial-rule"
              style={{ margin: "4rem 0" }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2rem",
                textAlign: "center",
              }}
            >
              {[
                { num: "24", label: "Hours of Innovation" },
                { num: "4+", label: "Expert Workshops" },
                { num: "200+", label: "Expected Hackers" },
                { num: "$$$$", label: "In Prizes" },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "3rem",
                      fontWeight: 700,
                      color: C.burnt,
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.gray,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
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
            maxWidth: "800px",
            margin: "0 auto",
            padding: "8rem 3rem",
          }}
        >
          <div style={{ marginBottom: "4rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.burnt,
                fontWeight: 600,
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Programme
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              The Schedule
            </h2>
          </div>

          {Object.entries(SCHEDULE).map(([day, events]) => (
            <div key={day} style={{ marginBottom: "3rem" }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: C.burnt,
                  marginBottom: "0.5rem",
                }}
              >
                {day}
              </h3>
              <hr className="editorial-rule-thick" style={{ marginBottom: "0" }} />
              <div>
                {events.map((ev, i) => (
                  <div key={i} className="schedule-editorial-row">
                    <span
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: C.gray,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {ev.time}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.15rem",
                        fontWeight: (ev as { prayer?: boolean }).prayer
                          ? 600
                          : 400,
                        fontStyle: (ev as { prayer?: boolean }).prayer
                          ? "italic"
                          : "normal",
                        color: (ev as { prayer?: boolean }).prayer
                          ? C.burnt
                          : C.black,
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
            background: C.faintGray,
            padding: "8rem 3rem",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ marginBottom: "4rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: C.burnt,
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Frequently Asked
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Questions & Answers
              </h2>
            </div>

            {FAQ.map((item, i) => (
              <div key={i} className="faq-editorial">
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
                    color: C.black,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "1.2rem",
                    textAlign: "left",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span>
                    <span
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: "0.7rem",
                        color: C.burnt,
                        fontWeight: 600,
                        marginRight: "1rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.5rem",
                      fontWeight: 300,
                      color: C.burnt,
                      transition: "transform 0.3s",
                      transform:
                        openFAQ === i ? "rotate(45deg)" : "rotate(0)",
                      flexShrink: 0,
                      marginLeft: "1.5rem",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`faq-editorial-body ${openFAQ === i ? "open" : ""}`}
                >
                  <p
                    style={{
                      color: C.gray,
                      fontSize: "0.95rem",
                      lineHeight: 1.8,
                      paddingBottom: "1.5rem",
                      paddingLeft: "2.5rem",
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
            maxWidth: "800px",
            margin: "0 auto",
            padding: "8rem 3rem",
          }}
        >
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.burnt,
                fontWeight: 600,
                display: "block",
                marginBottom: "1rem",
              }}
            >
              With Gratitude
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Our Sponsors
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {SPONSORS.map((s) => (
              <div key={s} className="sponsor-editorial">
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 3rem 4rem",
            textAlign: "center",
          }}
        >
          <hr className="editorial-rule-thick" style={{ marginBottom: "2rem" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: C.burnt,
              }}
            >
              hack.msa
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: C.gray,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              UT Austin MSA · April 18–19, 2026
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

