import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const src = join(process.cwd(), "items", "GNU_Logo_PDF_page-0001-removebg-preview.png");
const destDir = join(process.cwd(), "public");
const dest = join(destDir, "gnu-logo.png");

if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

copyFileSync(src, dest);
console.log("✅ Logo copied to public/gnu-logo.png");
