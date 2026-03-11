import { NextRequest, NextResponse } from "next/server";

// ─── ENV VARS ────────────────────────────────────────────────────────────────
// GOOGLE_APPS_SCRIPT_URL → The Web App URL from your Google Apps Script deployment
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phoneCode, phone, course, country, state, educationDetails, date } = body;

    // Validate required fields
    if (!name || !email || !phone || !course || !country || !date) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Prepend a single quote so Google Sheets treats it as text instead of a formula (= +91)
    const fullPhone = `'${phoneCode || ""} ${phone}`.trim();
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    // If credentials are not set yet, fall back to a local-only response
    if (!scriptUrl) {
      console.warn(
        "[submit] Google Apps Script URL not configured. " +
        "Add GOOGLE_APPS_SCRIPT_URL to .env.local"
      );
      return NextResponse.json({
        success: true,
        message: "Submission received (Apps Script not configured yet – data logged server-side).",
        data: { name, email, phone: fullPhone, course, country, state, educationDetails, date },
      });
    }

    const submittedAt = new Date().toISOString();

    // Prepare data to send to Google Apps Script.
    // Using URLSearchParams (x-www-form-urlencoded) is the safest approach
    // because most Apps Scripts use `e.parameter` to access the variables.
    const formData = new URLSearchParams();
    formData.append("submittedAt", submittedAt);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", fullPhone);
    formData.append("course", course);
    formData.append("country", country);
    formData.append("state", state ?? "");
    formData.append("date", date);
    formData.append("educationDetails", educationDetails ?? "");

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    // Often Apps Script will return an HTML page or simple JSON. Just checking if it's OK is usually enough.
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[submit] Error from Apps Script:", response.status, response.statusText, errorText);
      throw new Error(`Apps Script responded with status ${response.status}`);
    }

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("[submit] Error writing to Google Sheets via Apps Script:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit. Please try again later." },
      { status: 500 }
    );
  }
}
