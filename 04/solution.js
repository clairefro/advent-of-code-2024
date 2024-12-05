const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

const matrix = raw.split("\n");

function rotateMatrix90(matrix) {
  const length = matrix[0].length;
  const rotated = [];
  for (let x = 0; x < length; x++) {
    const row = [];
    for (let y = 0; y < matrix.length; y++) {
      row.push(matrix[y][x]);
    }
    rotated.push(row.join(""));
  }
  return rotated;
}

function countHorVerDia(string, matrix) {
  let count = 0;
  // x
  console.log(matrix.slice(0, 10));
  count += countOccurences(string, matrix);
  // y
  count += countOccurences(string, rotateMatrix90(matrix));
  console.log(rotateMatrix90(matrix).slice(0, 10));

  // diagonal (left-right-down)
  count += countOccurences(string, rotateMatrix45Down(matrix));
  console.log(rotateMatrix45Down(matrix).slice(0, 10));

  // diagonal (left-right-up)
  count += countOccurences(string, rotateMatrix45Up(matrix));
  console.log(rotateMatrix45Up(matrix).slice(0, 10));
  return count;
}

function countOccurences(string, matrix) {
  const pFwd = getReFwd(string);
  const pBwd = getReBwd(string);
  let count = 0;
  matrix.forEach((r) => {
    // need to run separate sounts for forward on backward to account for overlapping instances
    const fmatches = r.match(pFwd);
    if (fmatches && fmatches.length) {
      count += fmatches.length;
    }
    const bmatches = r.match(pBwd);
    if (bmatches && bmatches.length) {
      count += bmatches.length;
    }
  });
  return count;
}

function getReFwd(string) {
  return new RegExp(string, "g");
}

function getReBwd(string) {
  return new RegExp(`${string.split("").reverse().join("")}`, "g");
}

const m = ["abcd", "efgh", "ijkl", "mnop"];

// abcd
// efgh
// ijkl
// mnop

// fkp  [1,1] [2,2] [3,3]

// afkp  [0,0] [1,1] [2,2] [3,3]   y = 0
// bgl   [0,1] [1,2] [2,3]         y = 1
// ch    [0,2] [1,3]               y = 2
// d     [0,3]                     y = 3

// dgjm  [0,3],  [1,2], [2,2] [3,0]
// cfi   [0,2],  [1,1]  [2,0]
// be    [0,1]   [2,0]
// a     [0,0]

function rotateMatrix45Down(matrix) {
  const length = matrix.length;
  const rotated = [];
  for (let y = 0; y < length; y++) {
    const row = [];
    for (let x = 0; x < matrix[0].length - y; x++) {
      row.push(matrix[x][x + y]);
    }
    rotated.push(row.join(""));
  }
  return rotated;
}

function rotateMatrix45Up(matrix) {
  const length = matrix.length;
  const rotated = [];
  for (let y = 0; y < length; y++) {
    const row = [];
    for (let x = 0; x < matrix[0].length - y; x++) {
      row.push(matrix[x][matrix[0].length - y - 1 - x]);
    }
    rotated.push(row.join(""));
  }
  return rotated;
}

// const x = ["XMAS", "MXAM", "ASMX", "SAMX"];

const w = ["XMAS", "XMAS", "XMAS", "XMAS"];

// XMAS
// XMAS
// XMAS

console.log(countHorVerDia("XMAS", matrix));

console.log(rotateMatrix45Down(m));
console.log(rotateMatrix45Up(m));
