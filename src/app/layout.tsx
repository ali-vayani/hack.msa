import type { Metadata } from "next";
import "./globals.css";
import MicrosoftClarity from "@/components/MicrosoftClarity";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hackmsa.com"),
  title: {
    default: "hack.msa | Muslim Tech Hackathon",
    template: "%s | hack.msa",
  },
  description:
    "Inspiring the next generation of Muslim builders. Join us for a 24-hour hackathon at UT Austin, April 18-19. Open to all students.",
  keywords: [
    "Hackathon",
    "MSA",
    "Muslim",
    "Tech",
    "UT Austin",
    "Coding",
    "Programming",
    "Software Engineering",
    "Innovation",
    "Startup",
  ],
  authors: [{ name: "hack.msa Team" }],
  creator: "hack.msa Team",
  publisher: "hack.msa Organization",
  openGraph: {
    title: "hack.msa | Muslim Tech Hackathon",
    description:
      "Inspiring the next generation of Muslim builders. Join us for a 24-hour hackathon at UT Austin, April 18-19.",
    url: "https://www.hackmsa.com",
    siteName: "hack.msa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Nueces_Mosque.png",
        width: 1200,
        height: 630,
        alt: "hack.msa - Nueces Mosque",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "hack.msa | Muslim Tech Hackathon",
    description:
      "Inspiring the next generation of Muslim builders. Join us for a 24-hour hackathon at UT Austin, April 18-19.",
    images: ["/Nueces_Mosque.png"],
    creator: "@hackmsa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.hackmsa.com",
  },
};

export const viewport = {
  themeColor: "#f8f1e8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "hack.msa",
  "startDate": "2026-04-18T11:00",
  "endDate": "2026-04-19T11:30",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "University of Texas at Austin",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nueces Mosque",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "addressCountry": "US",
    },
  },
  "image": ["https://www.hackmsa.com/Nueces_Mosque.png"],
  "description":
    "hack.msa is UT Austin MSA's first-ever hackathon — a 24-hour event where students come together to build innovative tech solutions.",
  "organizer": {
    "@type": "Organization",
    "name": "hack.msa",
    "url": "https://www.hackmsa.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <MicrosoftClarity />
      </body>
    </html>
  );
}
