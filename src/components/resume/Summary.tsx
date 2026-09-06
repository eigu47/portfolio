import { Text } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import type { ResumeContent } from "~/content";

export default function Summary({ content }: { content: ResumeContent }) {
  return (
    <Section title={content.labels.summary}>
      <Text style={{ textAlign: "justify", paddingHorizontal: 3 }}>
        {renderLocalizedText(content.summary)}
      </Text>
    </Section>
  );
}

const japaneseRun =
  /([\u2e80-\u2fff\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)/g;

function renderLocalizedText(text: string) {
  return text.split(japaneseRun).map((run, index) =>
    index % 2 === 1 ? (
      <Text key={index} style={{ fontFamily: "notosans", fontSize: 9 }}>
        {run}
      </Text>
    ) : (
      run
    ),
  );
}
