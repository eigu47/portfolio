import {
  countryQuiz,
  keyboardSniper,
  playpool,
  traveler,
} from "~/assets/images";

export type Project = {
  name: string;
  url: string;
  image: string;
};

export const siteContent = {
  hero: {
    greeting: "Hello, I am",
    name: "Eiguchi Pablo",
    role: "- Web Developer -",
  },
  about:
    "I'm a self-taught frontend developer with a primary focus on React and TypeScript.\nI love to learn new technologies to improve my skills and stay current with industry trends.",
  projects: [
    {
      name: "Playpool",
      url: "https://playpool.vercel.app/",
      image: playpool,
    },
    {
      name: "Country Quiz",
      url: "https://country-quiz-eigu.vercel.app/",
      image: countryQuiz,
    },
    {
      name: "Traveler",
      url: "https://traveler-eigu.vercel.app/",
      image: traveler,
    },
    {
      name: "Keyboard Sniper",
      url: "https://keyboard-sniper.web.app/",
      image: keyboardSniper,
    },
  ] satisfies Project[],
};
