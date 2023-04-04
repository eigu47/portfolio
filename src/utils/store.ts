export const COLORS = {
  slate100: "#f1f5f9",
  slate300: "#cbd5e1",
  slate400: "#a1a1aa",
  slate900: "#0f172a",
  emerald400: "#34d399",
} as const;

export const PAGES = [
  {
    id: "#",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "about",
    position: [-1, -2, -5],
    rotation: [0, 0.5, 0],
  },
  {
    id: "projects",
    position: [0.5, -3, 0],
    rotation: [0, 1, 0],
  },
  {
    id: "contact",
    position: [0, -4, 0],
    rotation: [0, 1, 0],
  },
] as const;
