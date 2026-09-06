import { Text, View } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import { resumeContent } from "~/content";
import { COLORS } from "~/utils/config";

export default function Skills() {
  return (
    <Section title="SKILLS">
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {resumeContent.skills.map((skill, i) => (
          <View
            key={i}
            style={{
              border: `1px solid ${COLORS.emerald400}`,
              backgroundColor: "#ecfdf5",
              borderRadius: 10,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ color: COLORS.slate900, paddingTop: 5 }}>{skill}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}
