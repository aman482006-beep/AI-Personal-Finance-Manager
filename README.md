# Moneta — Personal Finance Manager

A local-first personal finance dashboard designed for GitHub Pages. Import CSV statements, map bank columns, categorise transactions, analyse cash flow, track budgets, identify recurring payments and statistical outliers, and ask questions against verified local calculations.

## GitHub Pages compatibility

This repository's primary app is a static browser application. GitHub Pages cannot execute FastAPI/Python or host SQLite, so this edition uses browser JavaScript, localStorage, PapaParse and Chart.js. It works without a backend and does not send transaction data to an external AI provider. The assistant is a deterministic, data-grounded local analyst, not a hosted generative LLM.

## Deploy

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main`, folder `/ (root)`, and Save.
4. Wait for the Pages deployment action to finish, then open the published URL.

No build command or secrets are required. Serve the repository root locally with any static web server for development.

## Features

- CSV import with flexible column mapping for date, description, debit, credit, amount, balance, reference and account.
- Basic validation, skipped-row reporting and duplicate detection.
- Rule-based merchant categorisation and manual category correction through transaction editing/re-import workflow.
- Income, expenses, net cash flow and savings-rate calculations.
- Monthly cash-flow and category charts, transaction search and filters.
- Category budgets with consumed/remaining/over-limit indicators.
- Heuristic recurring merchant detection with possible/likely labels.
- Statistical outlier flags with explanations; these are not fraud determinations.
- Local Q&A whose monetary figures come from application calculations.
- CSV and JSON backup exports, plus a text monthly report.
- Currency display setting (INR default).
- Fictional demonstration data; no banking credentials or bank API connection.

## Data and privacy limitations

The Pages build stores data in this browser's localStorage. It is not encrypted, does not sync across devices, has no server-side user authentication, and should not be used on shared/public devices or as a production store for sensitive financial statements. Clearing browser storage removes the app's data. Use export backup before changing browsers/devices. Do not commit real financial statements to this repository.

## Production architecture

For a production multi-user deployment, add a separately hosted FastAPI service, SQLite or managed relational database, password hashing, secure HTTP-only sessions, per-user authorization, CSRF protections, rate limiting, HTTPS, encrypted backups, audit logging and account deletion workflows. Put secrets in the server environment, never in static frontend files. An LLM integration should be opt-in, disclose exactly which fields leave the device, minimise/redact data, and receive only verified aggregate facts where possible. The frontend should call the hosted API; GitHub Pages alone cannot run that service.

## Development

- `index.html` — app shell
- `styles.css` — responsive UI
- `app.js` — import, storage, classification, analytics, budgeting, recurrence, anomaly and local analyst logic
- `sample-transactions.csv` — fictional Indian-style bank statement for import testing
- `tests/` — lightweight browser-independent logic tests

External libraries are loaded from public CDNs (PapaParse and Chart.js). A network connection is required for CSV parsing and charts; transaction calculations and storage otherwise run in-browser.

## Disclaimer

Moneta is an educational software project, not a bank, accounting system, financial adviser or fraud-detection service. Confirm imported statement data and calculations before relying on them. It does not connect to banks or process payments.