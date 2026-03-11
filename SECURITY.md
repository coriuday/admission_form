# Security Policy

## Supported Versions

We take security seriously. Since this project is actively developed, generally only the latest main branch releases are officially supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| v1.0.x  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We strongly encourage you to report security vulnerabilities privately so that they can be fixed before being disclosed to the public.

If you discover a potential vulnerability in this project, please **do not open a public issue**. Instead, follow these steps:

1. **Email us privately** or use GitHub's private vulnerability reporting feature if enabled on the repository.
2. In your report, please provide the following:
   * A detailed description of the vulnerability.
   * Steps to reproduce the issue.
   * Information about the environment (e.g., browser, Node/Bun version).
   * Any potential impact you foresee.

### What to Expect

1. We will acknowledge receipt of your vulnerability report within 72 hours.
2. We will send you regular updates about our progress fixing the vulnerability.
3. Once the vulnerability is resolved, we will publish a release containing the fix.
4. We will publicly acknowledge your responsible disclosure, if you wish.

## Environment Variables

Please ensure you **never commit your `.env.local`** file, which contains sensitive information like `GOOGLE_APPS_SCRIPT_URL`, `GEMINI_API_KEY`, etc. Doing so compromises the security of your backend services and integrations.
