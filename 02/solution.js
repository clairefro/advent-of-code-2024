const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

const lines = raw.split("\n");

const reports = lines.map((l) => l.split(" ").map(Number));

function runTests(reports) {
  const summary = {};
  for (let i = 0; i < reports.length; i++) {
    const res = isSafe(reports[i]) ? "safe" : "unsafe";
    summary[res] ? (summary[res] += 1) : (summary[res] = 1);
  }
  return summary;
}

function isSafe(report) {
  const diffs = getDiffs(report);
  return allIncOrDec(diffs) && allInRange(diffs);
}

function getDiffs(report) {
  const diffs = [];
  for (let i = 0; i < reports.length; i++) {
    if (report[i + 1]) diffs.push(report[i + 1] - report[i]);
  }
  return diffs;
}

function isInRangeInc(n, min, max) {
  return n >= min && n <= max;
}

function allInRange(diffs) {
  return diffs.every((d) => isInRangeInc(Math.abs(d), 1, 3));
}

function allIncOrDec(diffs) {
  return diffs.every((d) => d > 0) || diffs.every((d) => d < 0);
}

console.log("# PART 1");
console.log("# Number of safe reports");
console.log(runTests(reports));

function runTestsWithDampener(reports) {
  const summary = {};
  for (let i = 0; i < reports.length; i++) {
    let res = isSafe(reports[i]) ? "safe" : "unsafe";

    if (res === "unsafe") {
      res = isSafeDamp(reports[i]) ? "semisafe" : "unsafe";
    }

    summary[res] = (summary[res] || 0) + 1;
  }
  return summary;
}

function removeItemAtIndex(i, arr) {
  return [...arr.slice(0, i), ...arr.slice(i + 1)];
}

function isSafeDamp(report) {
  for (let i = 0; i < report.length; i++) {
    const dampened = removeItemAtIndex(i, report);
    if (isSafe(dampened)) return true;
  }
  return false;
}

console.log("# PART 2");
console.log("Count safe with dampener");
console.log(runTestsWithDampener(reports));
