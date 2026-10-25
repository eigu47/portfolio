import React from "react";

import { Font } from "@react-pdf/renderer";
import { cleanup, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@react-pdf/renderer", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@react-pdf/renderer")>();
  return {
    ...actual,
    PDFDownloadLink: ({
      children,
      fileName,
      document: _document,
      ...props
    }: PdfProps) =>
      React.createElement(
        "a",
        { ...props, href: "#download", download: fileName },
        children,
      ),
    PDFViewer: ({
      children: _children,
      showToolbar: _showToolbar,
      ...props
    }: PdfProps) => React.createElement("div", props),
  };
});

import Resume from "~/components/resume/Index";
import { resumeContent } from "~/content";

type PdfProps = {
  children?: React.ReactNode;
  document?: unknown;
  fileName?: string;
  showToolbar?: boolean;
  [key: string]: unknown;
};

afterEach(cleanup);

describe("resume route seam", () => {
  it("keeps natural Japanese summary line breaks in the locale content", () => {
    expect(resumeContent.ja.summary).toContain("ウェブ開発者です。\n");
    expect(resumeContent.ja.summary).not.toContain("-\n");
  });

  it("keeps resume collections keyed and language levels numeric", () => {
    const content = resumeContent.ja;

    expect(Object.keys(content.contact)).toEqual([
      "phone",
      "email",
      "website",
      "location",
    ]);
    expect(content.contact.location.text).toBe("横浜、日本");
    expect(resumeContent.en.contact.location.text).toBe("Yokohama, Japan");
    expect(resumeContent.en.summary).toContain("based in Yokohama");
    expect(resumeContent.ja.summary).toContain("横浜を拠点");
    expect(content.languages.japanese).toMatchObject({
      level: 3,
      levelLabel: "上級",
    });
    expect(
      Object.values(content.languages).every(({ level }) =>
        Number.isInteger(level),
      ),
    ).toBe(true);
  });

  it("keeps backend skills current in both locales", () => {
    for (const content of [resumeContent.en, resumeContent.ja]) {
      expect(content.skills).toMatchObject({
        node: "Node.js",
        express: "Express",
        golang: "Golang",
      });
    }
  });

  it("exposes the English download and locale toggle", () => {
    const { getByRole, getByTitle } = render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>,
    );

    expect(
      getByRole("navigation", { name: "Resume actions" }),
    ).toBeInTheDocument();
    expect(getByTitle("Resume PDF")).toBeInTheDocument();
    expect(getByRole("link", { name: /Download PDF/ })).toHaveAttribute(
      "download",
      "EiguchiPablo.pdf",
    );
    expect(getByRole("button", { name: "日本語 PDF" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(getByRole("link", { name: "Japanese .xls" })).toHaveAttribute(
      "href",
      "/栄口パブロ.xls",
    );
    expect(getByRole("link", { name: "Back to portfolio" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("starts in Japanese from the query and switches the download locale", async () => {
    window.history.pushState({}, "", "/resume?lang=ja");
    const user = userEvent.setup();
    const { getByRole } = render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getByRole("button", { name: "English PDF" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      expect(getByRole("link", { name: /PDFをダウンロード/ })).toHaveAttribute(
        "download",
        "EiguchiPablo-ja.pdf",
      );
    });
    await user.click(getByRole("button", { name: "English PDF" }));
    expect(getByRole("link", { name: /Download PDF/ })).toHaveAttribute(
      "download",
      "EiguchiPablo.pdf",
    );
    window.history.pushState({}, "", "/resume");
  });

  it("registers the subsetted font for the Japanese PDF", async () => {
    window.history.pushState({}, "", "/resume?lang=ja");

    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(Font.getRegisteredFonts().notosans?.sources[0]?.src).toMatch(
        /NotoSansJP-Regular\.ttf/,
      );
    });

    window.history.pushState({}, "", "/resume");
  });
});
