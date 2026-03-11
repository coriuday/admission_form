# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-03-12
### Added
- Added a new `Previous Education Details` mandatory text area.
- Added comprehensive documentation (Code of Conduct, Contributing Guidelines, Security Policy).
- Implemented editable Country Code field tied to Country selection.

### Changed
- Refactored form layout to place Phone Number and Select Course fields side-by-side to optimize vertical space.
- Transitioned runtime and package management from `npm` to `bun` for improved speed.
- Updated Google Apps Script deployment payload structure.

### Removed
- Removed the `Preferred Date` field from the frontend UI, validation schema, backend parsing, and Google Sheets implementation.

## [1.0.0] - Initial Release
### Added
- Created the core Next.js 15 Admission Enquiry Form.
- Developed the Framer Motion animated background UI.
- Implemented Zod and React Hook Form validation.
- Wired backend `route.ts` to push submissions to a Google Apps Script Web App.
