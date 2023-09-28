import { Path, Svg, Text, View } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import { COLORS, RESUME } from "~/utils/config";

export default function Interests() {
  return (
    <Section title="INTERESTS">
      <View style={{ flexDirection: "column", gap: 8 }}>
        {RESUME.interests.map((interest, index) => (
          <>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Svg
                viewBox="0 0 24 24"
                height={16}
                width={16}
                style={{ top: -4 }}
                {...interest.svgProps}
              >
                {interest.svgPath.map((path, i) => (
                  <Path key={i} d={path} fill={COLORS.slate900} />
                ))}
              </Svg>
              <Text key={index} style={{ fontWeight: 500 }}>
                {interest.title}
              </Text>
            </View>
            {index !== RESUME.interests.length - 1 && (
              <View
                style={{
                  height: "0.5px",
                  backgroundColor: COLORS.slate400,
                  borderRadius: "50%",
                  marginBottom: 4,
                }}
              />
            )}
          </>
        ))}
      </View>
    </Section>
  );
}
