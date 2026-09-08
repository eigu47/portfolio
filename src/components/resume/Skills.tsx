import { Text, View } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import type { ResumeContent } from "~/content";
import { COLORS } from "~/utils/config";

export default function Skills({
  content,
  fontScale,
}: {
  content: ResumeContent;
  fontScale: number;
}) {
  return (
    <Section title={content.labels.skills} fontScale={fontScale}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {Object.entries(content.skills).map(([id, skill]) => (
          <View key={id}>
            <Text style={{ color: COLORS.slate900 }}>{skill}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}
