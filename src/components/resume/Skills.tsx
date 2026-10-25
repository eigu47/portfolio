import { Text, View } from "@react-pdf/renderer";

import Section, { type ResumeSectionProps } from "~/components/resume/Section";
import { COLORS } from "~/utils/config";

export default function Skills({ content, fontScale }: ResumeSectionProps) {
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
