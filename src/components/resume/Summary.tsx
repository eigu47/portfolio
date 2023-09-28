import { Text } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";

export default function Summary() {
  return (
    <Section title="Summary">
      <Text>
        I am a Japanese-Argentinian (
        <Text style={{ fontFamily: "notosans", fontSize: 9 }}>⽇系⼈</Text>) web
        developer based in Kawasaki with a strong passion for coding and
        learning. I started learning programming in early 2022 and have since
        completed various Udemy courses on HTML/CSS/Javascript, React.js,
        TypeScript, Next.js, React Native, and Three.js. My language skills
        include JLPT 2 in Japanese, TOEIC score of 840 in English, and native
        Spanish fluency. I love learning new technologies to improve my skills
        and staying current with industry trends.
      </Text>
    </Section>
  );
}
