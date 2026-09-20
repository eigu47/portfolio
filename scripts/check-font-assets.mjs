import { readdirSync } from "node:fs";
import { join } from "node:path";

const assetDirectory = join(process.cwd(), "dist", "assets");
const japaneseAssets = readdirSync(assetDirectory).filter((file) =>
  file.startsWith("NotoSansJP-"),
);
const japaneseFonts = japaneseAssets.filter(
  (file) => file.endsWith(".woff2") || file.endsWith(".ttf"),
);
const unexpectedJapaneseAssets = japaneseAssets.filter(
  (file) => !/^NotoSansJP-Regular-[\w-]+\.(js|ttf|woff2)$/.test(file),
);

if (
  japaneseFonts.length !== 2 ||
  !japaneseFonts.some((file) => file.endsWith(".ttf")) ||
  !japaneseFonts.some((file) => file.endsWith(".woff2")) ||
  unexpectedJapaneseAssets.length > 0
) {
  throw new Error(
    `Expected subsetted Noto Sans JP TTF and WOFF2 assets with lazy chunks, found: ${japaneseAssets.join(", ") || "none"}`,
  );
}

process.stdout.write(`Font asset check passed: ${japaneseFonts.join(", ")}\n`);
