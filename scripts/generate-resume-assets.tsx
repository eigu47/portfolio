/*
 * Regenerates the static resume assets from the single source of truth
 * (resumeContent + MyDocument), so /public/EiguchiPablo.{pdf,jpg} can never
 * go stale relative to the resume route. Runs in Node via an SSR build so the
 * `~` path aliases resolve:
 *
 *   npm run gen:resume-assets
 *
 *   vite build --ssr scripts/generate-resume-assets.tsx  # bundles this file
 *   node .resume-gen/generate-resume-assets.js           # does the work
 */
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pdf } from "pdf-to-img";

import { MyDocument, registerCalibreFonts } from "~/components/resume/Document";
import { resumeContent } from "~/content";

const root = process.cwd();
const fontDir = path.join(root, "src", "assets", "fonts");

registerCalibreFonts([
  { fontWeight: 300, src: path.join(fontDir, "Calibre-Light.ttf") },
  { fontWeight: 400, src: path.join(fontDir, "Calibre-Regular.ttf") },
  { fontWeight: 500, src: path.join(fontDir, "Calibre-Medium.ttf") },
]);

const pdfBuffer = await renderToBuffer(
  <MyDocument
    content={resumeContent.en}
    locale="en"
    avatarSrc={path.join(root, "public", "avatar.jpg")}
  />,
);

await writeFile(path.join(root, "public", "EiguchiPablo.pdf"), pdfBuffer);

const document = await pdf(pdfBuffer, { scale: 2, format: "jpg" });
const firstPage = await document.getPage(1);
await writeFile(path.join(root, "public", "EiguchiPablo.jpg"), firstPage);
await document.destroy();

process.stdout.write(
  "Resume assets regenerated: public/EiguchiPablo.pdf, public/EiguchiPablo.jpg\n",
);
