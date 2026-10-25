import { Text } from "@react-pdf/renderer";

import Section, { type ResumeSectionProps } from "~/components/resume/Section";

export default function Summary({ content, fontScale }: ResumeSectionProps) {
  return (
    <Section title={content.labels.summary} fontScale={fontScale}>
      <Text
        style={{
          paddingHorizontal: 3,
        }}
      >
        {content.summary}
      </Text>
    </Section>
  );
}
