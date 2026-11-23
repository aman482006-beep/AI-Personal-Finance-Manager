const test=require("node:test");
const assert=require("node:assert/strict");
const {parseDate}=require("../date-utils.js");
test("ISO dates are parsed without locale ambiguity",()=>{
  assert.equal(parseDate("2026-11-23"),"2026-11-23");
  assert.equal(parseDate("2026/11/23"),"2026-11-23");
});
test("ambiguous dates use day-first by default for Indian statements",()=>{
  assert.equal(parseDate("01/02/2026"),"2026-02-01");
  assert.equal(parseDate("01-02-2026"),"2026-02-01");
});
test("month-first statements can be selected explicitly",()=>{
  assert.equal(parseDate("01/02/2026","mdy"),"2026-01-02");
});
test("unambiguous day-first and month-first dates are detected",()=>{
  assert.equal(parseDate("13/02/2026","mdy"),"2026-02-13");
  assert.equal(parseDate("02/13/2026","dmy"),"2026-02-13");
});
test("invalid calendar dates are rejected rather than normalised",()=>{
  assert.equal(parseDate("31/02/2026"),null);
  assert.equal(parseDate("2026-02-31"),null);
  assert.equal(parseDate("13/13/2026"),null);
  assert.equal(parseDate(""),null);
});
test("two-digit years remain supported",()=>{
  assert.equal(parseDate("31/12/26"),"2026-12-31");
});
