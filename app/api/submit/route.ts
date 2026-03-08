import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// ─── ENV VARS (add these to .env.local when you have the credentials) ─────────
// GOOGLE_SHEET_ID        → The ID from your Google Sheet URL
// GOOGLE_CLIENT_EMAIL    → Service account email from the JSON key file
// GOOGLE_PRIVATE_KEY     → Private key from the JSON key file (keep newlines)
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, course, country, state, date } = body;

    // Validate required fields
    if (!name || !email || !phone || !course || !country || !date) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    // If credentials are not set yet, fall back to a local-only response
    if (!sheetId || !clientEmail || !privateKey) {
      console.warn(
        "[submit] Google Sheets credentials not configured. " +
          "Add GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY to .env.local"
      );
      return NextResponse.json({
        success: true,
        message: "Submission received (Sheets not configured yet – data logged server-side).",
        data: { name, email, phone, course, country, state, date },
      });
    }

    // Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const submittedAt = new Date().toISOString();

    // Append a new row to the first sheet (Sheet1)
    // Column order: Submitted At | Name | Email | Phone | Course | Country | State | Preferred Date
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [submittedAt, name, email, phone, course, country, state ?? "", date],
        ],
      },
    });

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("[submit] Error writing to Google Sheets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit. Please try again later." },
      { status: 500 }
    );
  }
}
