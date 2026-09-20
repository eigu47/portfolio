import { useEffect, useState } from "react";

import {
  Document,
  Font,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import { HiOutlineDownload } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { calibre300, calibre400, calibre500 } from "~/assets/fonts";
import Certifications from "~/components/resume/Certifications";
import Header from "~/components/resume/Header";
import Interests from "~/components/resume/Interests";
import Languages from "~/components/resume/Languages";
import QRCode from "~/components/resume/QRCode";
import Skills from "~/components/resume/Skills";
import Summary from "~/components/resume/Summary";
import type { Locale, ResumeContent } from "~/content";
import { resumeContent } from "~/content";
import { COLORS } from "~/utils/config";

export default function Resume() {
  const location = useLocation();
  const navigate = useNavigate();
  const [locale, setLocale] = useState<Locale>(() =>
    new URLSearchParams(location.search || window.location.search).get(
      "lang",
    ) === "ja"
      ? "ja"
      : "en",
  );
  const [japaneseFontReady, setJapaneseFontReady] = useState(false);

  useEffect(() => {
    if (locale !== "ja" || japaneseFontReady) return;

    void import("~/assets/fonts/NotoSansJP-Regular.ttf").then(
      ({ default: src }) => {
        Font.register({
          family: "notosans",
          fonts: [{ fontWeight: 400, src }],
        });
        setJapaneseFontReady(true);
      },
    );
  }, [japaneseFontReady, locale]);

  const documentLocale = locale === "ja" && japaneseFontReady ? "ja" : "en";
  const documentContent = resumeContent[documentLocale];
  const switchLocale = () => {
    const nextLocale = locale === "ja" ? "en" : "ja";
    setLocale(nextLocale);
    void navigate(
      {
        pathname: location.pathname,
        search: `?lang=${nextLocale}`,
      },
      { replace: true },
    );
  };

  return (
    <div className="bg-bg-base text-text-lo flex min-h-dvh pt-16">
      <header className="border-hairline shadow-chrome fixed top-0 z-10 w-full border-b bg-[rgba(9,9,11,0.7)] backdrop-blur-md">
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
            <button
              type="button"
              aria-pressed={locale === "ja"}
              aria-label={locale === "ja" ? "English PDF" : "日本語 PDF"}
              onClick={switchLocale}
              className="border-hairline bg-surface text-text-faint hover:border-accent space-between relative flex h-8 w-18 items-center overflow-hidden rounded-full border p-1 text-xs font-medium tracking-wide transition-colors"
            >
              <span
                className={`relative top-0.5 z-10 flex h-6 w-full items-center justify-center text-center ${
                  locale === "en" ? "text-bg-base" : ""
                }`}
              >
                EN
              </span>
              <span
                className={`relative top-0.5 z-10 flex h-6 w-full items-center justify-center text-center ${
                  locale === "ja" ? "text-bg-base" : ""
                }`}
              >
                JA
              </span>
              <span
                aria-hidden="true"
                className={`bg-accent absolute top-1 left-1 h-6 w-8 rounded-full transition-transform ${
                  locale === "ja" ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
            <PDFDownloadLink
              id="download_resume"
              document={
                <MyDocument content={documentContent} locale={documentLocale} />
              }
              fileName={
                documentLocale === "ja"
                  ? "EiguchiPablo-ja.pdf"
                  : "EiguchiPablo.pdf"
              }
              className="bg-accent text-bg-base hover:bg-text-hi inline-flex h-10 w-40 shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors"
            >
              <HiOutlineDownload aria-hidden="true" />
              <span
                className={`pt-1 ${documentLocale === "ja" ? "text-sm" : ""}`}
                style={{ fontSize: 16 * getFontScale(locale) }}
              >
                {documentLocale === "ja" ? "PDFをダウンロード" : "Download PDF"}
              </span>
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

      <main className="mx-auto flex min-h-full w-full max-w-7xl justify-center px-2 py-4 sm:px-6 sm:py-8 lg:px-8">
        {documentLocale === "en" ? (
          <iframe
            className="w-full"
            title="Resume PDF"
            src="/EiguchiPablo.pdf"
          />
        ) : (
          <PDFViewer className="min-h-0 w-full" showToolbar>
            <MyDocument content={documentContent} locale={documentLocale} />
          </PDFViewer>
        )}
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

export function MyDocument({
  content,
  locale,
}: {
  content: ResumeContent;
  locale: Locale;
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
        <Header content={content} locale={locale} fontScale={fontScale} />
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

export function Section({
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

function getFontScale(locale: string) {
  return locale == "ja" ? 5 / 6 : 1;
}
