import { Text, View } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import { COLORS, RESUME } from "~/utils/config";

export default function Skills() {
  return (
    <Section title="SKILLS">
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {RESUME.skills.map((skill, i) => (
          <View key={i} style={{ flexDirection: "column" }}>
            <Text>{skill}</Text>
            <View
              style={{
                height: "0.5px",
                width: "90%",
                backgroundColor: COLORS.slate800,
                borderRadius: "50%",
              }}
            />
          </View>
        ))}
      </View>
    </Section>
  );
}
