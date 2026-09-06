import {
  Page,
  Document,
  PDFViewer,
  Font,
  PDFDownloadLink,
  View,
  Text,
} from "@react-pdf/renderer";
import { HiOutlineDownload } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

import {
  calibre300,
  calibre400,
  calibre500,
  notosans400,
} from "~/assets/fonts";
import Certifications from "~/components/resume/Certifications";
import Header from "~/components/resume/Header";
import Interests from "~/components/resume/Interests";
import Languages from "~/components/resume/Languages";
import QRCode from "~/components/resume/QRCode";
import Skills from "~/components/resume/Skills";
import Summary from "~/components/resume/Summary";
import { COLORS } from "~/utils/config";

export default function Resume() {
  return (
    <div className="bg-bg-base text-text-lo min-h-screen pt-16">
      <header className="border-hairline shadow-chrome fixed top-0 z-10 w-full border-b bg-[rgba(9,9,11,0.7)] backdrop-blur-[12px] backdrop-blur-md">
        <nav
          aria-label="Resume actions"
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <Link
            to="/"
            className="text-text-lo hover:text-text-hi inline-flex items-center gap-2 px-2 py-3 text-lg transition-colors"
          >
            <HiArrowLeft aria-hidden="true" />
            <span>Back to portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <PDFDownloadLink
              id="download_resume"
              document={<MyDocument />}
              fileName="EiguchiPablo.pdf"
              className="bg-accent text-bg-base hover:bg-text-hi inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-medium transition-colors"
            >
              <HiOutlineDownload aria-hidden="true" />
              <span className="pt-1">Download PDF</span>
            </PDFDownloadLink>
            <a
              href="/栄口パブロ.xls"
              target="_blank"
              rel="noreferrer"
              id="download_jp_resume"
              className="text-text-lo hover:text-accent text-xs transition-colors sm:text-sm"
            >
              Japanese .xls
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl justify-center px-2 py-4 sm:px-6 sm:py-8 lg:px-8">
        <PDFViewer className="min-h-0 w-full" showToolbar>
          <MyDocument />
        </PDFViewer>
      </main>
    </div>
  );
}

Font.register({
  family: "calibre",
  fonts: [
    { fontWeight: 300, src: calibre300 },
    { fontWeight: 400, src: calibre400 },
    { fontWeight: 500, src: calibre500 },
  ],
});

Font.register({
  family: "notosans",
  fonts: [{ fontWeight: 400, src: notosans400 }],
});

Font.registerHyphenationCallback((word) => [word]);

export function MyDocument() {
  return (
    <Document title="Eiguchi Pablo Martin.pdf" author="Eiguchi Pablo Martin">
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: "#ffffff",
          width: "100%",
          height: "100%",
          fontFamily: "calibre",
          fontWeight: 400,
          color: COLORS.slate800,
          fontSize: 12,
        }}
      >
        <Header />
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
          <View style={{ flex: 0.6, flexDirection: "column", gap: 24 }}>
            <Summary />

            <Certifications />

            <QRCode />
          </View>

          <View style={{ flex: 0.4, flexDirection: "column", gap: 24 }}>
            <Skills />

            <Languages />

            <Interests />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ flexDirection: "column" }}>
      <Text
        style={{
          fontWeight: 500,
          fontSize: 13,
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
