import { type Svg, Text } from "@react-pdf/renderer";

export const COLORS = {
  slate100: "#f1f5f9",
  slate300: "#cbd5e1",
  slate400: "#a1a1aa",
  slate800: "#1e293b",
  slate900: "#0f172a",
  emerald400: "#34d399",
  emerald500: "#10b981",
} as const;

export const PAGES = [
  {
    id: "",
    href: "#",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "about",
    href: "#about",
    position: [-0.35, -1.5, -3],
    rotation: [-0.2, 0, 0],
  },
  {
    id: "projects",
    href: "#projects",
    position: [-0.65, -3, -0.5],
    rotation: [0, 0.5, 0],
  },
  {
    id: "contact",
    href: "#contact",
    position: [-0.45, -4, -2],
    rotation: [0, 1, 0],
  },
  {
    id: "resume",
    href: "#resume",
    position: [-0.45, -3.95, 1],
    rotation: [0, 1, 0],
  },
] as const;

function Summary() {
  return (
    <Text style={{ textAlign: "justify", paddingHorizontal: 3 }}>
      I am a Japanese-Argentinian (
      <Text style={{ fontFamily: "notosans", fontSize: 9 }}>⽇系⼈</Text>) web
      developer based in Kawasaki with a strong passion for coding and
      continuous learning. I started my programming journey in early 2022 and
      have since completed several Udemy courses covering HTML/CSS/Javascript,
      React.js, TypeScript, Next.js, React Native, and Three.js. Additionally, I
      completed the Harvard University online course CS50 Introduction to
      Computer Science. My language skills include JLPT 2 proficiency in
      Japanese, an English TOEIC score of 840, and native Spanish fluency. I
      love learning new technologies to improve my skills and staying current
      with industry trends.
    </Text>
  );
}

export const RESUME: {
  Summary: React.ReactNode;
  contact: {
    text: string;
    svgPath: string;
    svgProps?: React.ComponentProps<typeof Svg>;
  }[];
  certifications: {
    title: string;
    sub: string;
    date: string;
    score?: string;
  }[];
  skills: string[];
  languages: {
    title: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Fluent" | "Native";
  }[];
  interests: {
    title: string;
    svgPath: string[];
    svgProps?: React.ComponentProps<typeof Svg>;
  }[];
} = {
  Summary: <Summary />,
  contact: [
    {
      // telephone
      text: "(+81) 070-4325-1645",
      svgPath:
        "M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 012.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z",
      svgProps: { viewBox: "0 0 16 16" },
    },
    {
      // mail
      text: "pablo.eiguchi@gmail.com",
      svgPath:
        "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm16 3.38V6H4v1.38l8 4 8-4zm0 2.24l-7.55 3.77a1 1 0 01-.9 0L4 9.62V18h16V9.62z",
    },
    {
      // web
      text: "www.eiguchipablo.dev",
      svgPath:
        "M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 019.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 015.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 00-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z",
    },
    {
      // map-marker
      text: "Kawasaki, Japan",
      svgPath:
        "M12 11.5A2.5 2.5 0 019.5 9 2.5 2.5 0 0112 6.5 2.5 2.5 0 0114.5 9a2.5 2.5 0 01-2.5 2.5M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z",
    },
  ],
  certifications: [
    {
      title: "JLPT N2",
      sub: "Japanese Language Proficiency Test",
      date: "2005",
    },
    {
      title: "TOEIC Listening & Reading",
      sub: "TOEIC Program IIBC",
      date: "2021",
      score: "840 / 990",
    },
  ],
  skills: [
    "HTML/CSS/Javascript",
    "React.js",
    "TypeScript",
    "Next.js",
    "React Native",
    "Tailwind",
    "Redux",
    "Three.js",
    "Node.js",
  ],
  languages: [
    {
      title: "Spanish",
      level: "Native",
    },
    {
      title: "Japanese",
      level: "Advanced",
    },
    {
      title: "English",
      level: "Advanced",
    },
  ],
  interests: [
    {
      // bx-cycling
      title: "Cycling",
      svgPath: [
        "M11 15.414V20h2v-4.586c0-.526-.214-1.042-.586-1.414l-2-2L13 9.414l2 2c.372.372.888.586 1.414.586H20v-2h-3.586l-3.707-3.707a.999.999 0 00-1.414 0L8 9.586c-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414l3 3z",
        "M18 5 A2 2 0 0 1 16 7 A2 2 0 0 1 14 5 A2 2 0 0 1 18 5 z",
        "M18 14c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM6 22c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z",
      ],
    },
    {
      // mountain-sun
      title: "Travel",
      svgPath: [
        "M560 160c44.2 0 80-35.8 80-80S604.2 0 560 0s-80 35.8-80 80 35.8 80 80 80zM55.9 512h523c33.8 0 61.1-27.4 61.1-61.1 0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1 0 487 25 512 55.9 512z",
      ],
      svgProps: { viewBox: "0 0 640 512" },
    },
    {
      // bx-book-open
      title: "Learning",
      svgPath: [
        "M21 3h-7a2.98 2.98 0 00-2 .78A2.98 2.98 0 0010 3H3a1 1 0 00-1 1v15a1 1 0 001 1h5.758c.526 0 1.042.214 1.414.586l1.121 1.121c.009.009.021.012.03.021.086.079.182.149.294.196h.002a.996.996 0 00.762 0h.002c.112-.047.208-.117.294-.196.009-.009.021-.012.03-.021l1.121-1.121A2.015 2.015 0 0115.242 20H21a1 1 0 001-1V4a1 1 0 00-1-1zM8.758 18H4V5h6c.552 0 1 .449 1 1v12.689A4.032 4.032 0 008.758 18zM20 18h-4.758c-.799 0-1.584.246-2.242.689V6c0-.551.448-1 1-1h6v13z",
      ],
    },
  ],
};
