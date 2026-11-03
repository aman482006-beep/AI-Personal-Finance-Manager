# Moneta — Personal Finance Manager

Local-first finance dashboard for GitHub Pages. Import CSV statements, map columns, categorise transactions, analyse cash flow, manage budgets, identify recurring patterns and statistical outliers, and ask questions answered from locally calculated figures.

## Deploy
1. Open **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Choose `main`, folder `/ (root)`, then Save.
4. Wait for deployment and open the published URL. No build step or API secret is required.

## Features
- CSV upload and flexible mapping for date, description, debit, credit, amount, balance, reference and account.
- Date/amount validation, skipped-row feedback and duplicate detection.
- Rule-based merchant categorisation; manual category selection during entry.
- Income, expenses, net cash flow, savings rate, monthly trends and category charts.
- Search, transaction filters, manual entry, deletion and CSV export.
- Category budgets and overspending indicators.
- Recurring merchant heuristics labelled possible/likely.
- Statistical unusual-spend flags with explanations, not fraud detection.
- Local financial Q&A; figures come from app calculations, not invented model output.
- Monthly report, transaction CSV and JSON backup exports.
- INR default, selectable currency and fictional demo data.

## Architecture and privacy limitations
GitHub Pages serves static files; it cannot run FastAPI/Python, SQLite, secure server sessions or a hosted LLM. This edition processes data in JavaScript and stores it in browser localStorage. The assistant is a deterministic local analyst, not a generative LLM. There is no real user authentication, encryption or multi-device sync.

Do not use this browser demo as a secure vault for sensitive statements or on shared/public devices. localStorage is not encrypted and is device/browser-specific. Export backups before changing browsers. Never commit personal statements.

For production, deploy a separately hosted FastAPI service and database. Add password hashing, secure HTTP-only sessions, CSRF protections, per-user authorization, rate limiting, HTTPS, encrypted backups, audit logs and deletion workflows. Keep API keys server-side. LLM requests need explicit consent and disclosure; minimise raw transaction data sent to providers.

## Files
- `index.html`: application pages
- `styles.css`: responsive interface
- `app.js`: parsing, categorisation, calculations, budgets, recurrence, anomaly flags and local Q&A
- `sample-transactions.csv`: fictional Indian-style statement
- `tests/logic.test.js`: financial logic unit tests

PapaParse and Chart.js load from public CDNs. Internet access is needed for CSV parsing and chart rendering; calculations and storage run locally.

## Disclaimer
Educational software only. Not a bank, financial adviser, accounting system, tax service, investment recommendation or fraud detector. Verify imported figures.