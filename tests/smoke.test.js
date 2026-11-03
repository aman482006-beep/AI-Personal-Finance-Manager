const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

test("all hard-coded app DOM references exist in HTML", () => {
  const ids = [...html.matchAll(/\\bid="([^"]+)"/g)].map((m) => m[1]);
  const unique = new Set(ids);
  assert.equal(unique.size, ids.length, "HTML contains duplicate IDs");
  const referenced = [...app.matchAll(/getElementById\\("([^"]+)"\\)/g)].map((m) => m[1]);
  const missing = [...new Set(referenced.filter((id) => !unique.has(id)))];
  assert.deepEqual(missing, []);
});

test("AI beta exposes supported providers and no key is persisted", () => {
  for (const provider of ["openai", "grok", "gemini"]) {
    assert.match(html, new RegExp('value="' + provider + '"'));
  }
  assert.match(app, /https:\\/\\/api\\.openai\\.com\\/v1/);
  assert.match(app, /https:\\/\\/api\\.x\\.ai\\/v1/);
  assert.match(app, /generativelanguage\\.googleapis\\.com/);
  assert.match(app, /store:false/);
  assert.doesNotMatch(app, /localStorage\\.(?:setItem|getItem)\\([^;]*(?:apiKey|aiSession)/);
});

test("AI provider receives aggregated totals, not transaction descriptions", () => {
  const start = app.indexOf("function aiFinancialSummary");
  const end = app.indexOf("function extractAIText", start);
  assert.ok(start >= 0 && end > start);
  const summary = app.slice(start, end);
  assert.doesNotMatch(summary, /description|merchant|reference|account/);
});

test("themes are selectable and have matching palette rules", () => {
  for (const theme of ["sage", "ocean", "lavender", "sand", "midnight"]) {
    assert.match(html, new RegExp('value="' + theme + '"'));
  }
  for (const theme of ["ocean", "lavender", "sand", "midnight"]) {
    assert.ok(css.includes('data-theme="' + theme + '"'), "Missing CSS palette: " + theme);
  }
});

test("budget removal is a labelled action, not an unlabeled ellipsis", () => {
  assert.match(app, /class="link remove-budget"[^>]*>Remove<\\/button>/);
  assert.doesNotMatch(app, /data-remove-budget[^>]*>···/);
});

test("CSV export defends against spreadsheet formula injection", () => {
  assert.match(app, /function csvEscape\\(v\\).*\^\\[\\s\\]\\*\\[=\\+@/);
});
