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
    section: "Hello",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "about",
    section: "About",
    position: [0, -1.5, -3],
    rotation: [-0.25, 0, 0],
  },
  {
    id: "projects",
    section: "Projects",
    position: [-0.2, -3, 0],
    rotation: [0, 1, 0],
  },
  {
    id: undefined,
    section: "Projects",
    position: [-0.2, -3, 0],
    rotation: [0, 1, 0],
  },
  {
    id: undefined,
    section: "Projects",
    position: [-0.2, -3, 0],
    rotation: [0, 1, 0],
  },
  {
    id: "contact",
    section: "Contact",
    position: [0, -4, 0],
    rotation: [0, 2, 0],
  },
  {
    id: "resume",
    section: "Resume",
    position: [0, -5, 0],
    rotation: [0, 2, 0],
  },
] as const;
