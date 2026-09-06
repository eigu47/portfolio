import React from "react";

import { cleanup, render } from "@testing-library/react";
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

type PdfProps = {
  children?: React.ReactNode;
  document?: unknown;
  fileName?: string;
  showToolbar?: boolean;
  [key: string]: unknown;
};

afterEach(cleanup);

describe("resume route seam", () => {
  it("exposes the English download and locale toggle", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>,
    );

    expect(
      getByRole("navigation", { name: "Resume actions" }),
    ).toBeInTheDocument();
    expect(getByRole("link", { name: /Download PDF/ })).toHaveAttribute(
      "download",
      "EiguchiPablo.pdf",
    );
    expect(getByRole("button", { name: "日本語 PDF" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(getByRole("link", { name: "Back to portfolio" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("starts in Japanese from the query and switches the download locale", () => {
    window.history.pushState({}, "", "/resume?lang=ja");
    const { getByRole } = render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>,
    );

    expect(getByRole("button", { name: "English PDF" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(getByRole("link", { name: /PDFをダウンロード/ })).toHaveAttribute(
      "download",
      "EiguchiPablo-ja.pdf",
    );
    window.history.pushState({}, "", "/resume");
  });
});
