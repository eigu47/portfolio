import { cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { siteContent } from "~/content";
import { renderApp } from "~/test/render-app";
import { restoreWebGL } from "~/test/webgl-stub";

afterEach(() => {
  cleanup();
  restoreWebGL();
  vi.restoreAllMocks();
});

describe("root app seam (WebGL stubbed)", () => {
  it("defines the ordered contact collection", () => {
    expect(
      siteContent.contacts.map(({ label, href }) => ({ label, href })),
    ).toEqual([
      {
        label: "Github",
        href: "https://github.com/eigu47",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/eiguchipablo/",
      },
    ]);
    expect(
      siteContent.contacts.every(({ icon }) => typeof icon === "function"),
    ).toBe(true);
    expect(siteContent.mail).toEqual({
      label: "pablo.eiguchi@gmail.com",
      href: "mailto:pablo.eiguchi@gmail.com",
    });
  });

  it("renders the navbar chrome", () => {
    const { getByRole } = renderApp();

    for (const name of ["hello", "about", "projects", "contact", "resume"]) {
      expect(getByRole("link", { name })).toBeInTheDocument();
    }
    expect(document.querySelector("nav")).toHaveClass(
      "backdrop-blur-md",
      "shadow-chrome",
    );
    expect(document.querySelector("nav ul")).toHaveClass("px-4", "sm:px-6");
  });

  it("does not apply box hover treatment to nav or rail links", () => {
    const { getByRole } = renderApp();

    expect(getByRole("link", { name: "about" })).not.toHaveClass(
      "hover:shadow-[0_4px_20px_var(--color-accent-glow)]",
    );
    expect(getByRole("button", { name: "Open menu" })).not.toHaveClass(
      "hover:shadow-[0_4px_20px_var(--color-accent-glow)]",
    );
    expect(getByRole("link", { name: "Github" })).not.toHaveClass(
      "hover:shadow-[0_4px_20px_var(--color-accent-glow)]",
    );
  });

  it("links to the resume pdf from the navbar", () => {
    const { getByLabelText } = renderApp();

    expect(getByLabelText("Resume")).toHaveAttribute("href", "/resume");
  });

  it("renders the social and email rail", () => {
    const { getByLabelText, getByRole } = renderApp();

    expect(getByLabelText("Github")).toHaveAttribute(
      "href",
      "https://github.com/eigu47",
    );
    expect(getByLabelText("Github")).toHaveAttribute("target", "_blank");
    expect(getByLabelText("LinkedIn")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/eiguchipablo/",
    );
    expect(
      getByRole("link", { name: "pablo.eiguchi@gmail.com" }),
    ).toHaveAttribute("href", "mailto:pablo.eiguchi@gmail.com");
    expect(
      getByRole("link", { name: "pablo.eiguchi@gmail.com" }),
    ).not.toHaveAttribute("target");
  });

  it("renders one full-height section per page", () => {
    renderApp();

    for (const id of ["about", "projects", "contact", "resume"]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it("mirrors the scene content in accessible landmarks", () => {
    const { getByRole, getByText } = renderApp();

    expect(getByRole("main")).toBeInTheDocument();
    expect(getByRole("contentinfo")).toBeInTheDocument();
    expect(getByText("Eiguchi Pablo", { selector: "h1" })).toBeInTheDocument();
    expect(getByRole("link", { name: "Playpool" })).toHaveAttribute(
      "href",
      "https://playpool.vercel.app/",
    );
  });

  it("toggles the mobile menu button state on click", async () => {
    const user = userEvent.setup();
    const screen = renderApp();
    const button = screen.getByRole("button");

    expect(button).toHaveAccessibleName("Open menu");
    await user.click(button);
    expect(button).toHaveAccessibleName("Close menu");
    await user.click(button);
    expect(button).toHaveAccessibleName("Open menu");
  });

  it("mounts the WebGL canvas", () => {
    const { getError } = renderApp();

    expect(document.querySelector("canvas")).toBeInTheDocument();
    expect(getError()).toBeNull();
  });
});

describe("root app seam (WebGL unavailable)", () => {
  it("renders the readable static page when WebGL is unavailable", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { getError, container } = renderApp("unavailable");

    await vi.waitFor(() => {
      expect(container.textContent).toContain("Eiguchi Pablo");
    });

    expect(getError()).toBeNull();
    expect(container.querySelector("canvas")).not.toBeInTheDocument();
    expect(container.querySelector("main")).toBeInTheDocument();
    expect(container.textContent).toContain("Selected work");
    expect(
      within(container).getByRole("link", { name: "Playpool" }),
    ).toHaveAttribute("href", "https://playpool.vercel.app/");
    expect(
      within(container).getByRole("link", {
        name: "pablo.eiguchi@gmail.com",
      }),
    ).toHaveAttribute("href", "mailto:pablo.eiguchi@gmail.com");
    expect(
      within(container).getByRole("link", { name: "Github" }),
    ).toHaveAttribute("href", "https://github.com/eigu47");
    expect(
      within(container).getByRole("link", { name: "LinkedIn" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/eiguchipablo/");
    consoleError.mockRestore();
  });

  it("uses the static page when reduced motion is preferred", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { container } = renderApp();

    expect(container.querySelector("canvas")).not.toBeInTheDocument();
    expect(container.textContent).toContain(
      "I'm a self-taught frontend developer",
    );
  });
});
