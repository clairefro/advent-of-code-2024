const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

const pattern = /mul\(\d{1,3},\d{1,3}\)/g;

const matches = raw.match(pattern);

const multiples = parseMultiples(matches);

function sum(multiples) {
  return multiples.reduce((a, b) => a + b, 0);
}

function parseMultiples(matches) {
  return matches
    .map((m) => m.match(/(\d{1,3}),(\d{1,3})/)[0].split(","))
    .map(([a, b]) => parseInt(a) * parseInt(b));
}

console.log("# PART 1");
console.log("Sum of products");
console.log(sum(multiples));

/** ------------------------------------- */

const pattern2 = /(mul\(\d{1,3},\d{1,3}\))|(do(n't)?\(\))/g;

const matches2 = raw.match(pattern2);

function eliminateDonts(arr) {
  let result = [];
  let ok = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "do()") {
      ok = true;
    } else if (arr[i] === "don't()") {
      ok = false;
    } else if (ok) {
      result.push(arr[i]);
    }
  }
  return result;
}

const dos = eliminateDonts(matches2);
const multiples2 = parseMultiples(dos);

console.log("# PARRT 2");
console.log("Exclude don'ts");
console.log(sum(multiples2));
