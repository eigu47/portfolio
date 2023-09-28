import { View, Text, Svg, Path, Image } from "@react-pdf/renderer";

import { RESUME } from "~/utils/config";

export default function Header() {
  return (
    <View
      style={{
        padding: 30,
        backgroundColor: "#232E5C",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: 500,
        gap: 30,
        color: "white",
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
          }}
        >
          Eiguchi Pablo Martín
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Web Developer
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
                {RESUME.contact.map(
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
                          <Path d={svgPath} fill="white" />
                        </Svg>
                        <Text>{text}</Text>
                      </View>
                    )
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
        }}
      />
    </View>
  );
}
