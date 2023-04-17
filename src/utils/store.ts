export const COLORS = {
  slate100: "#f1f5f9",
  slate300: "#cbd5e1",
  slate400: "#a1a1aa",
  slate900: "#0f172a",
  emerald400: "#34d399",
} as const;

export const PAGES = [
  {
    id: "home",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "about",
    position: [0, -1.2, -3],
    rotation: [-0.2, 0, 0],
  },
  {
    id: "projects",
    position: [-1, -3, 0],
    rotation: [0, 0.5, 0],
  },
  {
    id: "contact",
    position: [-1, -4, 0],
    rotation: [0, 1, 0],
  },
  {
    id: "resume",
    position: [0, -5, 0],
    rotation: [0, 1, 0],
  },
] as const;
