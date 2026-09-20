import { readdirSync } from "node:fs";
import { join } from "node:path";

const assetDirectory = join(process.cwd(), "dist", "assets");
const japaneseAssets = readdirSync(assetDirectory).filter((file) =>
  file.startsWith("NotoSansJP-"),
);
const japaneseFonts = japaneseAssets.filter((file) => file.endsWith(".woff2"));
const unexpectedJapaneseAssets = japaneseAssets.filter(
  (file) => !/^NotoSansJP-Regular-[\w-]+\.(js|woff2)$/.test(file),
);

if (
  japaneseFonts.length !== 1 ||
  !/^NotoSansJP-Regular-[\w-]+\.woff2$/.test(japaneseFonts[0]) ||
  unexpectedJapaneseAssets.length > 0
) {
  throw new Error(
    `Expected one subsetted Noto Sans JP WOFF2 asset and its lazy chunk, found: ${japaneseAssets.join(", ") || "none"}`,
  );
}

console.log(`Font asset check passed: ${japaneseFonts[0]}`);
