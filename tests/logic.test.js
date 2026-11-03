const test=require("node:test");const assert=require("node:assert/strict");
function totals(ts){const income=ts.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);const expenses=ts.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);return{income,expenses,net:income-expenses,rate:income?(income-expenses)/income*100:0};}
function key(t){return[t.date,Number(t.amount.toFixed(2)),t.type,t.description.toLowerCase().replace(/\s+/g," ").trim()].join("|")}
function budget(limit,tx,category){const spent=tx.filter(t=>t.type==="expense"&&t.category===category).reduce((a,t)=>a+t.amount,0);return{spent,remaining:limit-spent,percent:limit?spent/limit*100:0}}
test("cash flow excludes transfers",()=>assert.deepEqual(totals([{type:"income",amount:1000},{type:"expense",amount:250},{type:"transfer",amount:500}]),{income:1000,expenses:250,net:750,rate:75}));
test("zero income yields zero savings rate",()=>assert.equal(totals([{type:"expense",amount:10}]).rate,0));
test("duplicate key normalises case and spaces",()=>assert.equal(key({date:"2026-10-01",amount:10,type:"expense",description:"Coffee  shop"}),key({date:"2026-10-01",amount:10,type:"expense",description:"coffee shop"})));
test("budget remaining and percentage",()=>assert.deepEqual(budget(500,[{type:"expense",category:"Food",amount:200},{type:"income",category:"Food",amount:500}],"Food"),{spent:200,remaining:300,percent:40}));
test("budget overrun is captured",()=>assert.deepEqual(budget(100,[{type:"expense",category:"Food",amount:140}],"Food"),{spent:140,remaining:-40,percent:140}));
