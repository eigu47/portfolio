import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { renderApp } from "~/test/render-app";
import { restoreWebGL } from "~/test/webgl-stub";

afterEach(() => {
  cleanup();
  restoreWebGL();
  vi.restoreAllMocks();
});

describe("root app seam (WebGL stubbed)", () => {
  it("renders the navbar chrome", () => {
    const { getByRole } = renderApp();

    for (const name of ["hello", "about", "projects", "contact", "resume"]) {
      expect(getByRole("link", { name })).toBeInTheDocument();
    }
    expect(document.querySelector("nav")).toBeInTheDocument();
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
    expect(getByLabelText("LinkedIn")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/eiguchipablo/",
    );
    expect(
      getByRole("link", { name: "pablo.eiguchi@gmail.com" }),
    ).toHaveAttribute("href", "mailto:pablo.eiguchi@gmail.com");
  });

  it("renders one full-height section per page", () => {
    renderApp();

    for (const id of ["about", "projects", "contact", "resume"]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
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
  it("does not crash, but leaves an empty canvas with all content invisible (ticket 06 target)", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { getError, container } = renderApp("unavailable");

    // give React a tick to surface any deferred failure
    await vi.waitFor(() => {
      expect(container.querySelector("canvas")).toBeInTheDocument();
    });

    // the app survives — react-three-fiber swallows the context failure...
    expect(getError()).toBeNull();

    // ...but today there is no DOM fallback: none of the canvas-only copy
    // reaches the DOM. ticket 06 flips this — the fallback page must keep
    // the site's content visible without WebGL.
    expect(container.textContent).not.toContain("Eiguchi Pablo");
    consoleError.mockRestore();
  });
});
