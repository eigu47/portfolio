import { Text, View } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import type { ResumeContent } from "~/content";
import { COLORS } from "~/utils/config";

export default function Skills({ content }: { content: ResumeContent }) {
  return (
    <Section title={content.labels.skills}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {content.skills.map((skill, i) => (
          <View
            key={i}
            style={{
              border: `1px solid ${COLORS.emerald400}`,
              backgroundColor: "#ecfdf5",
              borderRadius: 10,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ color: COLORS.slate900, paddingTop: 5 }}>
              {skill}
            </Text>
          </View>
        ))}
      </View>
    </Section>
  );
}
