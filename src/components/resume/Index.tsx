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
    <div className="flex h-screen flex-col-reverse justify-center gap-40 p-10 sm:gap-0 lg:flex-row lg:p-0">
      <aside className="mx-auto flex basis-1/5 flex-col items-center justify-center gap-20">
        <button className="rounded bg-gray-300 px-4 py-6 text-xl font-bold text-gray-800 hover:bg-gray-400">
          <PDFDownloadLink
            document={<MyDocument />}
            fileName="EiguchiPablo.pdf"
            className="flex items-center gap-4"
          >
            <HiOutlineDownload className="shrink-0 text-4xl" />
            <span>Download</span>
          </PDFDownloadLink>
        </button>
        <button className="rounded bg-gray-300 px-4 py-6 text-xl font-bold text-gray-800 hover:bg-gray-400">
          <a
            href="/栄口パブロ.xls"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4"
          >
            <HiOutlineDownload className="shrink-0 text-4xl" />
            <span>Download .xls japanese format</span>
          </a>
        </button>
      </aside>

      <PDFViewer
        className="mx-auto hidden h-screen w-full py-10 sm:block 2xl:basis-2/5"
        showToolbar={true}
      >
        <MyDocument />
      </PDFViewer>

      <aside className="mx-auto flex items-center justify-center lg:basis-1/5">
        <button className="rounded bg-gray-300 px-4 py-6 text-xl font-bold text-gray-800 hover:bg-gray-400">
          <Link to="/">Back to my portfolio</Link>
        </button>
      </aside>
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

export function MyDocument() {
  return (
    <Document title="Eiguchi Pablo Martin.pdf" author="Eiguchi Pablo Martin">
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: COLORS.slate100,
          width: "100%",
          height: "100%",
          fontFamily: "calibre",
          fontWeight: 400,
          color: "black",
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
            margin: 30,
          }}
        >
          <View style={{ flex: 0.6, flexDirection: "column", gap: 30 }}>
            <Summary />

            <Certifications />

            <QRCode />
          </View>

          <View style={{ flex: 0.4, flexDirection: "column", gap: 30 }}>
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
      <Text style={{ fontWeight: 500, fontSize: 20, color: COLORS.slate900 }}>
        {title}
      </Text>
      <View
        style={{
          height: "2px",
          backgroundColor: COLORS.slate900,
          borderRadius: "50%",
          marginBottom: 12,
        }}
      />
      {children}
    </View>
  );
}
