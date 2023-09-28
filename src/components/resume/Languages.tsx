import { Text, View } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import { COLORS, RESUME } from "~/utils/config";

export default function Languages() {
  return (
    <Section title="LANGUAGES">
      <View style={{ flexDirection: "column", gap: 10 }}>
        {RESUME.languages.map((language, index) => (
          <>
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: 500, fontSize: 15 }}>
                  {language.title}
                </Text>
                <Text style={{ left: 6 }}>{language.level}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 2, top: 5 }}>
                {Object.keys(LANGUAGE_LEVELS).map((level, i) => (
                  <View
                    key={i}
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      backgroundColor:
                        LANGUAGE_LEVELS[
                          language.level.toLowerCase() as keyof typeof LANGUAGE_LEVELS
                        ] >=
                        LANGUAGE_LEVELS[level as keyof typeof LANGUAGE_LEVELS]
                          ? COLORS.slate800
                          : COLORS.slate400,
                    }}
                  />
                ))}
              </View>
            </View>

            {index !== RESUME.languages.length - 1 && (
              <View
                style={{
                  height: "0.5px",
                  backgroundColor: COLORS.slate400,
                  borderRadius: "50%",
                  marginBottom: 2,
                }}
              />
            )}
          </>
        ))}
      </View>
    </Section>
  );
}

const LANGUAGE_LEVELS = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  fluent: 4,
  native: 5,
};
