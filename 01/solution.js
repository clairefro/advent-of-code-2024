const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */
const lines = raw.trim().split("\n");
const list_l = [];
const list_r = [];

lines.forEach((l) => {
  const parts = l.split(/\s+/);
  list_l.push(parts[0]);
  list_r.push(parts[1]);
});

list_l.sort();
list_r.sort();

const diffs = list_l.map((l, i) => Math.abs(l - list_r[i]));

console.log("# PART 1");
console.log("Total differences");
console.log(diffs.reduce((a, b) => a + b, 0));

let simularityScore = 0;

function countAppearances(item, arr) {
  let count = 0;
  arr.forEach((n) => (n === item ? (count += 1) : undefined));
  return count;
}

list_l.forEach((l) => {
  const count = countAppearances(l, list_r);
  const score = l * count;
  simularityScore += score;
});

console.log("# PART 2");
console.log("Simularity score (sum of integer * appearances)");
console.log(simularityScore);
