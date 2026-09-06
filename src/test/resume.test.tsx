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
  it("exposes a single download action and a tertiary Japanese spreadsheet link", () => {
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
    expect(getByRole("link", { name: "Japanese .xls" })).toHaveAttribute(
      "href",
      "/栄口パブロ.xls",
    );
    expect(getByRole("link", { name: "Back to portfolio" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(document.querySelector("button")).not.toBeInTheDocument();
  });
});
