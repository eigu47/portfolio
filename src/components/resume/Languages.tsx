import { Fragment } from "react";

import { Text, View } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import { resumeContent } from "~/content";
import { COLORS } from "~/utils/config";

export default function Languages() {
  return (
    <Section title="LANGUAGES">
      <View style={{ flexDirection: "column", gap: 10 }}>
        {resumeContent.languages.map((language, index) => (
          <Fragment key={index}>
            <View
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
                      borderRadius: 6.5,
                      backgroundColor:
                        LANGUAGE_LEVELS[
                          language.level.toLowerCase() as keyof typeof LANGUAGE_LEVELS
                        ] >=
                        LANGUAGE_LEVELS[level as keyof typeof LANGUAGE_LEVELS]
                          ? COLORS.emerald500
                          : COLORS.slate300,
                    }}
                  />
                ))}
              </View>
            </View>

            {index !== resumeContent.languages.length - 1 && (
              <View
                style={{
                  height: "0.5px",
                  backgroundColor: COLORS.slate400,
                  borderRadius: 0.25,
                  marginBottom: 2,
                }}
              />
            )}
          </Fragment>
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
