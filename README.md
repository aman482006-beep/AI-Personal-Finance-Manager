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
- Local financial Q&A plus optional OpenAI, Grok (xAI) and Gemini API integration using a user-supplied key.
- Five colour themes: Sage, Ocean, Lavender, Sand and Midnight.
- Monthly report, transaction CSV and JSON backup exports.
- INR default, selectable currency and fictional demo data.

## Architecture and privacy limitations
GitHub Pages serves static files; it cannot run FastAPI/Python, SQLite, secure server sessions or a hosted LLM. This edition processes data in JavaScript and stores transactions in browser localStorage. The local assistant is a deterministic analyst. Optional AI mode calls the selected provider directly from the browser using a key supplied by the user; the key exists in tab memory only and is not written to localStorage. On AI requests, Moneta sends the question and aggregate month/category/budget totals, not raw transaction rows or merchant names. This is still a browser-only integration: a browser extension, injected script, or compromised page could access a key while the tab is open. Use a restricted, low-limit API key and disconnect/close the tab when finished. Provider billing and provider data policies apply. There is no real user authentication, encryption or multi-device sync.

Do not use this browser demo as a secure vault for sensitive statements or on shared/public devices. localStorage is not encrypted and is device/browser-specific. Export backups before changing browsers. Never commit personal statements.

For production, deploy a separately hosted FastAPI service and database. For multi-device sync, use an authenticated database service such as Supabase or Firebase, or a server-side GitHub App/Worker broker. Never embed a GitHub personal access token in a GitHub Pages app: visitors can inspect browser code and requests. A browser-only app cannot safely commit private user data to GitHub. Add password hashing, secure HTTP-only sessions, CSRF protections, per-user authorization, rate limiting, HTTPS, encrypted backups, audit logs and deletion workflows. Keep API keys server-side. LLM requests need explicit consent and disclosure; minimise raw transaction data sent to providers.

## Files
- `index.html`: application pages
- `styles.css`: responsive interface
- `app.js`: parsing, categorisation, calculations, budgets, recurrence, anomaly flags and local Q&A
- `sample-transactions.csv`: fictional Indian-style statement
- `tests/logic.test.js`: financial logic unit tests

OpenAI Responses API: https://developers.openai.com/api/reference/resources/responses/methods/create
Grok Responses API: https://docs.x.ai/developers/rest-api-reference/inference/responses
Gemini generateContent API: https://ai.google.dev/api/generate-content

PapaParse and Chart.js load from public CDNs. Internet access is needed for CSV parsing and chart rendering; calculations and storage run locally.

## Disclaimer
Educational software only. Not a bank, financial adviser, accounting system, tax service, investment recommendation or fraud detector. Verify imported figures.

## Monthly report export
From **Settings**, export the current calendar month's report as PDF or TXT. The PDF renderer is loaded from jsPDF's public CDN; if it cannot load, the app falls back to a text report. CSV exports contain the complete transaction set.
