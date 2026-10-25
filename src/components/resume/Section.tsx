import { Text, View } from "@react-pdf/renderer";

import type { ResumeContent } from "~/content";
import { COLORS } from "~/utils/config";

/** The props every resume section travels with; see ticket 04/15 clump note. */
export type ResumeSectionProps = {
  content: ResumeContent;
  fontScale: number;
};

export default function Section({
  title,
  children,
  fontScale,
}: {
  title: string;
  children: React.ReactNode;
  fontScale: number;
}) {
  return (
    <View style={{ flexDirection: "column" }}>
      <Text
        style={{
          fontWeight: 500,
          fontSize: 13 * fontScale,
          letterSpacing: 1.5,
          color: COLORS.slate400,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          height: "1px",
          backgroundColor: COLORS.emerald400,
          borderRadius: 1,
          marginTop: 5,
          marginBottom: 10,
        }}
      />
      {children}
    </View>
  );
}
