import Link from "next/link";

export default function Home() {
  const designs = [
    {
      id: 1,
      name: "Celestial Night",
      desc: "Deep indigo starfield with golden Islamic motifs",
    },
    {
      id: 2,
      name: "Desert Warmth",
      desc: "Terracotta & sand with flowing organic shapes",
    },
    {
      id: 3,
      name: "Neo-Brutalist",
      desc: "Bold, raw, unapologetic clash of color and type",
    },
    {
      id: 4,
      name: "Editorial Luxe",
      desc: "Magazine-style sophistication with burnt orange accent",
    },
    {
      id: 5,
      name: "Geometric Mosaic",
      desc: "Islamic tessellations meet digital jewel tones",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          marginBottom: "0.5rem",
          letterSpacing: "-0.03em",
        }}
      >
        hack.msa
      </h1>
      <p style={{ color: "#888", fontSize: "1.1rem", marginBottom: "3rem" }}>
        5 Design Explorations
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {designs.map((d) => (
          <Link
            key={d.id}
            href={`/${d.id}`}
            style={{
              display: "block",
              padding: "2rem",
              border: "1px solid #222",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#fff",
              transition: "all 0.3s ease",
              background: "#111",
            }}
          >
            <span
              style={{
                fontSize: "3rem",
                fontWeight: 800,
                display: "block",
                marginBottom: "0.5rem",
                opacity: 0.2,
              }}
            >
              {String(d.id).padStart(2, "0")}
            </span>
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              {d.name}
            </span>
            <span style={{ color: "#666", fontSize: "0.9rem" }}>{d.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
