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
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "about",
    position: [0, -1.5, -3],
    rotation: [-0.25, 0, 0],
  },
  {
    id: "projects",
    position: [-0.2, -3, 0],
    rotation: [0, 0.5, 0],
  },
  {
    id: "contact",
    position: [0, -4.5, 0],
    rotation: [0, 1, 0],
  },
  {
    id: "resume",
    position: [0, -5.5, 0],
    rotation: [0, 2, 0],
  },
] as const;
