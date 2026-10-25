import { useEffect, useState } from "react";

import { Font, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { HiOutlineDownload } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { calibre300, calibre400, calibre500 } from "~/assets/fonts";
import { getFontScale, MyDocument, registerCalibreFonts } from "~/components/resume/Document";
import type { Locale } from "~/content";
import { resumeContent } from "~/content";

registerCalibreFonts([
  { fontWeight: 300, src: calibre300 },
  { fontWeight: 400, src: calibre400 },
  { fontWeight: 500, src: calibre500 },
]);

/**
 * PDFViewer forwards `title` to its underlying iframe at runtime but omits it
 * from PDFViewerProps, so route the prop through this once-cast wrapper.
 */
const ResumeViewer = (
  props: React.ComponentProps<typeof PDFViewer> & { title?: string },
) => <PDFViewer {...(props as React.ComponentProps<typeof PDFViewer>)} />;

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
      <header className="border-hairline shadow-chrome fixed top-0 z-10 w-full border-b bg-overlay backdrop-blur-md">
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
        <ResumeViewer className="min-h-0 w-full" showToolbar title="Resume PDF">
          <MyDocument content={documentContent} locale={documentLocale} />
        </ResumeViewer>
      </main>
    </div>
  );
}
