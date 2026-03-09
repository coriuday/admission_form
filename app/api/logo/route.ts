import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  const filePath = join(process.cwd(), "items", "GNU_Logo_PDF_page-0001-removebg-preview.png");
  const file = readFileSync(filePath);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
