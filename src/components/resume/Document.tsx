import {
  Document,
  Font,
  Page,
  View,
} from "@react-pdf/renderer";

import Certifications from "~/components/resume/Certifications";
import Header from "~/components/resume/Header";
import Interests from "~/components/resume/Interests";
import Languages from "~/components/resume/Languages";
import QRCode from "~/components/resume/QRCode";
import Skills from "~/components/resume/Skills";
import Summary from "~/components/resume/Summary";
import type { Locale, ResumeContent } from "~/content";
import { COLORS } from "~/utils/config";

/**
 * Registers the resume's body font. Kept explicit (no module side effect) so
 * callers can pass the source representation that fits their runtime: the
 * browser route passes Vite asset URLs, the asset generator passes disk paths.
 */
export function registerCalibreFonts(
  sources: { fontWeight: 300 | 400 | 500; src: string }[],
) {
  Font.register({ family: "calibre", fonts: sources });
}

export function MyDocument({
  content,
  locale,
  avatarSrc = "/avatar.jpg",
}: {
  content: ResumeContent;
  locale: Locale;
  avatarSrc?: string;
}) {
  const fontScale = getFontScale(locale);

  return (
    <Document title="Eiguchi Pablo Martin.pdf" author="Eiguchi Pablo Martin">
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: "#ffffff",
          width: "100%",
          height: "100%",
          fontFamily: locale === "ja" ? "notosans" : "calibre",
          fontWeight: 400,
          color: COLORS.slate800,
          fontSize: 12 * fontScale,
        }}
      >
        <Header content={content} locale={locale} fontScale={fontScale} avatarSrc={avatarSrc} />
        <View
          style={{
            maxWidth: "100%",
            flexGrow: 1,
            flexDirection: "row",
            gap: 30,
            marginTop: 30,
            marginRight: 30,
            marginBottom: 26,
            marginLeft: 30,
          }}
        >
          <View
            style={{
              flex: 0.6,
              flexDirection: "column",
              gap: 24,
            }}
          >
            <Summary content={content} fontScale={fontScale} />

            <Certifications content={content} fontScale={fontScale} />

            <QRCode fontScale={fontScale} />
          </View>

          <View
            style={{
              flex: 0.4,
              flexDirection: "column",
              gap: 24,
            }}
          >
            <Skills content={content} fontScale={fontScale} />

            <Languages content={content} fontScale={fontScale} />

            <Interests content={content} fontScale={fontScale} />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export function getFontScale(locale: Locale) {
  return locale === "ja" ? 5 / 6 : 1;
}
