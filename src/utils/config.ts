export const COLORS = {
  slate100: "#f1f5f9",
  slate300: "#cbd5e1",
  slate400: "#a1a1aa",
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
    href: "/EiguchiPablo.pdf",
    position: [-0.45, -3.95, 1],
    rotation: [0, 1, 0],
  },
] as const;
