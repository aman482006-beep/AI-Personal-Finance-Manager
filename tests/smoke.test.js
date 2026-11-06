const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

test("all app DOM references exist and IDs are unique", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const unique = new Set(ids);
  assert.equal(unique.size, ids.length, "HTML contains duplicate IDs");
  const referenced = [...app.matchAll(/getElementById\("([^"]+)"\)/g)].map((m) => m[1]);
  const missing = [...new Set(referenced.filter((id) => !unique.has(id)))];
  assert.deepEqual(missing, []);
});

test("AI beta exposes OpenAI, Grok and Gemini without persisting keys", () => {
  for (const provider of ["openai", "grok", "gemini"]) {
    assert.ok(html.includes('value="' + provider + '"'));
  }
  assert.ok(app.includes("https://api.openai.com/v1"));
  assert.ok(app.includes("https://api.x.ai/v1"));
  assert.ok(app.includes("generativelanguage.googleapis.com"));
  assert.ok(app.includes("store:false"));
  assert.ok(!/localStorage\.(?:setItem|getItem)\([^;]*(?:apiKey|aiSession)/.test(app));
});

test("AI context contains aggregates but not raw transaction details", () => {
  const start = app.indexOf("function aiFinancialSummary");
  const end = app.indexOf("function extractAIText", start);
  assert.ok(start >= 0 && end > start);
  const summary = app.slice(start, end);
  assert.doesNotMatch(summary, /description|merchant|reference|account/);
});

test("themes are selectable and matching palette rules exist", () => {
  for (const theme of ["sage", "ocean", "lavender", "sand", "midnight"]) {
    assert.ok(html.includes('value="' + theme + '"'));
  }
  for (const theme of ["ocean", "lavender", "sand", "midnight"]) {
    assert.ok(css.includes('data-theme="' + theme + '"'));
  }
});

test("budget removal uses a clearly labelled button", () => {
  assert.ok(app.includes('class="link remove-budget"'));
  assert.ok(app.includes('>Remove</button>'));
});

test("CSV export protects against spreadsheet formula injection", () => {
  assert.ok(app.includes('if(/^[\\s]*[=+@\\-\\t\\r]/.test(s))'));
});


test("first visit clearly offers demo, import and blank-workspace paths", () => {
  const welcome = html.match(/<div class="backdrop" id="welcomeModal">([\s\S]*?)<div class="backdrop" id="budgetModal">/);
  assert.ok(welcome, "First-visit welcome screen should exist");
  for (const id of ["welcomeDemo", "welcomeFresh", "welcomeImport"]) {
    assert.ok(welcome[1].includes('id="' + id + '"'), "Missing onboarding action " + id);
  }
  assert.ok(welcome[1].includes("fictional transactions"));
  assert.ok(welcome[1].includes("does not connect to a bank"));
  assert.ok(welcome[1].includes("does not sync across devices"));
  assert.ok(app.includes("firstVisit"), "Welcome flow should be gated to first visit");
});
