<div align="center">
  <img width="1200" height="475" alt="Admission Form Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  <h1>University Admission Enquiry Form</h1>
  <p>A modern, responsive admission enquiry form built with Next.js 15, featuring animated UI, smart validation, and Google Sheets integration.</p>

  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</div>

---

## ✨ Features

- 📋 **Multi-field form** — Name, Email, Phone, Course, Country, State, Preferred Date
- ✅ **Smart validation** — Powered by Zod + React Hook Form with real-time error feedback
- 🌍 **Conditional logic** — State field shown only for domestic applicants
- 🎨 **Animated UI** — Floating background icons and smooth transitions via Framer Motion
- 📊 **Google Sheets integration** — Submissions saved directly to a Google Sheet (backend-ready)
- ⚡ **Graceful fallback** — Works perfectly without credentials configured (safe for demos)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v8 or higher

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd af

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and fill in your values

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory. See [`.env.example`](.env.example) for reference.

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `APP_URL` | The URL where the app is hosted |
| `GOOGLE_SHEET_ID` | ID from your Google Sheet URL |
| `GOOGLE_CLIENT_EMAIL` | Service account email from your Google Cloud JSON key |
| `GOOGLE_PRIVATE_KEY` | Private key from your Google Cloud JSON key file |

> **Note:** The Google Sheets variables are optional. Without them, the form will still work and submissions are logged server-side.

---

## 📊 Google Sheets Integration

Once you have your Google Cloud credentials:

1. **Create a Service Account** in [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable** the Google Sheets API for your project
3. **Download** the JSON key file
4. **Share** your Google Sheet with the service account email (Editor access)
5. **Add** the credentials to your `.env.local`

The sheet will automatically receive columns in this order:

| Submitted At | Name | Email | Phone | Course | Country | State | Preferred Date |
|---|---|---|---|---|---|---|---|

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Google API | googleapis |

---

## 📁 Project Structure

```
af/
├── app/
│   ├── api/submit/route.ts   # Google Sheets API endpoint
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── AdmissionForm.tsx     # Main form component
│   └── BackgroundAnimation.tsx
├── lib/
│   ├── constants.ts          # Course, state & country data
│   └── utils.ts
└── hooks/
    └── use-mobile.ts
```

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
