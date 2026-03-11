# Contributing to the Admission Form Project

First off, thank you for considering contributing to this project! It's people like you that make open source such a great community.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](../../issues) first. If it doesn't already exist, please open a new issue.

## Fork & create a branch

1. Fork the project on GitHub.
2. Clone your fork locally.
3. Create a branch (`git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bugfix-name`).

## Local Development

This project uses `bun` and `Next.js 15`.

1. Install dependencies: `bun install`
2. Run the development server: `bun run dev`
3. Make your changes and test them thoroughly.

## Submitting a Pull Request

1. Commit your changes (`git commit -m "Add some feature"`). Ensure your commit messages are descriptive.
2. Push to the branch (`git push origin feature/your-feature-name`).
3. Open a Pull Request from your fork to the `main` branch of this repository.
4. Ensure your PR description clearly describes the problem and solution.

## Code Style

- We use **TypeScript** and **Tailwind CSS**.
- Ensure any new components are responsive and match the existing styling.
- Ensure Zod validation is updated if you add or modify form fields.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
