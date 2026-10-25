import { Fragment } from "react";

import { Text, View } from "@react-pdf/renderer";

import Section from "~/components/resume/Section";
import type { ResumeContent } from "~/content";
import { COLORS } from "~/utils/config";

export default function Languages({
  content,
  fontScale,
}: {
  content: ResumeContent;
  fontScale: number;
}) {
  return (
    <Section title={content.labels.languages} fontScale={fontScale}>
      <View style={{ flexDirection: "column", gap: 10 }}>
        {Object.entries(content.languages).map(([id, language], index) => (
          <Fragment key={id}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: 500, fontSize: 15 * fontScale }}>
                  {language.title}
                </Text>
                <Text style={{ left: 6 }}>{language.levelLabel}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 2, top: 5 }}>
                {LANGUAGE_LEVELS.map((level) => (
                  <View
                    key={level}
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: 6.5,
                      backgroundColor:
                        language.level >= level
                          ? COLORS.emerald500
                          : COLORS.slate300,
                    }}
                  />
                ))}
              </View>
            </View>

            {index !== Object.keys(content.languages).length - 1 && (
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

const LANGUAGE_LEVELS = [1, 2, 3, 4, 5] as const;
