import { View, Text, Svg, Path, Image } from "@react-pdf/renderer";

import type { ResumeContent } from "~/content";
import { COLORS } from "~/utils/config";

export default function Header({ content }: { content: ResumeContent }) {
  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: COLORS.slate100,
        borderBottom: `2px solid ${COLORS.emerald400}`,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: 500,
        gap: 30,
        color: COLORS.slate900,
      }}
    >
      <View
        style={{
          flexGrow: 1,
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            paddingBottom: 10,
            color: COLORS.slate900,
          }}
        >
          {content.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.emeraldDeep,
          }}
        >
          {content.role}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            fontWeight: 400,
          }}
        >
          {[...Array(2).keys()].map((_, colum) => (
            <View
              key={colum}
              style={{
                flexGrow: 1,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {content.contact.map(
                  ({ text, svgPath, svgProps }, index) =>
                    index % 2 === colum && (
                      <View
                        key={text}
                        style={{
                          flexDirection: "row",
                          gap: 2,
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          height={12}
                          width={12}
                          style={{ top: -2 }}
                          {...svgProps}
                        >
                          <Path d={svgPath} fill={COLORS.emerald500} />
                        </Svg>
                        <Text>{text}</Text>
                      </View>
                    ),
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      <Image
        src="/avatar.jpg"
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          border: `3px solid ${COLORS.emerald400}`,
        }}
      />
    </View>
  );
}
