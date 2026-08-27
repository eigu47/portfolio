import { Text } from "@react-pdf/renderer";

import { Section } from "~/components/resume/Index";
import { resumeContent } from "~/content";

export default function Summary() {
  return (
    <Section title="Summary">
      <Text style={{ textAlign: "justify", paddingHorizontal: 3 }}>
        {resumeContent.summary.beforeJapaneseIdentity}
        <Text style={{ fontFamily: "notosans", fontSize: 9 }}>
          {resumeContent.summary.japaneseIdentity}
        </Text>
        {resumeContent.summary.afterJapaneseIdentity}
      </Text>
    </Section>
  );
}
