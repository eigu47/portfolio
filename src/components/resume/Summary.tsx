import { Text } from "@react-pdf/renderer";

import Section from "~/components/resume/Section";
import type { ResumeContent } from "~/content";

export default function Summary({
  content,
  fontScale,
}: {
  content: ResumeContent;
  fontScale: number;
}) {
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
