import { Path, Svg, Text, View } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import { COLORS, RESUME } from "~/utils/config";

export default function Certifications() {
  return (
    <Section title="CERTIFICATIONS">
      <View style={{ width: "100%", flexDirection: "column", gap: 10 }}>
        {RESUME.certifications.map(({ title, sub, date, score }, index) => (
          <>
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "column", gap: 3 }}>
                <Text style={{ fontSize: 15 }}>{title}</Text>
                <Text style={{ fontWeight: 500 }}>{sub}</Text>
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <Svg
                    viewBox="0 0 16 16"
                    height={8}
                    width={8}
                    style={{ top: -0.5 }}
                  >
                    <Path
                      d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
                      fill={COLORS.slate900}
                    />
                    <Path
                      d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z"
                      fill={COLORS.slate900}
                    />
                  </Svg>
                  <Text style={{ fontSize: 10 }}>{date}</Text>
                </View>
              </View>

              {score && (
                <View
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: "90%",
                      width: "1px",
                      backgroundColor: COLORS.slate800,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      height: "100%",
                      marginHorizontal: 10,
                    }}
                  >
                    <Text style={{ color: COLORS.slate800 }}>Score</Text>
                    <Text style={{ fontWeight: 500 }}>{score}</Text>
                  </View>
                </View>
              )}
            </View>

            {index !== RESUME.certifications.length - 1 && (
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
