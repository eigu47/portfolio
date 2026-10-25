import type { Locale } from "~/content";

/**
 * Scale factor applied to every font size in the document so the JP glyphs
 * fit the same layout. The document's locale is the single source of truth;
 * anything needing sized text derives this from the locale.
 */
export function getFontScale(locale: Locale) {
  return locale === "ja" ? 5 / 6 : 1;
}
