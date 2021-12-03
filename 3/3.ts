import { readFileSync } from 'fs';

let lines = readFileSync('./3/3.in', 'utf8').split('\n');

let gr = [];
let er = [];

for (let i = 0; i < lines[0].length; i++) {
  let sum0s = 0;
  let sum1s = 0;

  lines.forEach((num) => {
    if (num[i] == '0') {
      sum0s++;
    } else {
      sum1s++;
    }
  });

  gr[i] = sum0s > sum1s ? '0' : '1';
  er[i] = sum0s > sum1s ? '1' : '0';
}

let grDec = parseInt(gr.join(''), 2);
let erDec = parseInt(er.join(''), 2);

console.log('part 1', grDec * erDec);

const findMostCommonInIndex = (lines, index) => {
  let sum0s = 0;
  let sum1s = 0;

  lines.forEach((num) => {
    if (num[index] == '0') {
      sum0s++;
    } else {
      sum1s++;
    }
  });

  return sum0s > sum1s ? '0' : '1';
};

const findLeastCommonInIndex = (lines, index) => {
  let sum0s = 0;
  let sum1s = 0;

  lines.forEach((num) => {
    if (num[index] == '0') {
      sum0s++;
    } else {
      sum1s++;
    }
  });

  if (sum1s === sum0s) {
    return '0';
  }

  return sum1s > sum0s ? '0' : '1';
};

let lines1 = [...lines];

for (let i = 0; i < 12; i++) {
  if (lines1.length == 1) {
    break;
  }
  const mostCommon = findMostCommonInIndex(lines1, i);
  lines1 = lines1.filter((line) => line[i] === mostCommon);
}

let oxigen = parseInt(lines1[0], 2);

let lines2 = [...lines];

for (let i = 0; i < 12; i++) {
  if (lines2.length == 1) {
    break;
  }
  const leastCommon = findLeastCommonInIndex(lines2, i);
  lines2 = lines2.filter((line) => line[i] === leastCommon);
}

let co = parseInt(lines2[0], 2);

console.log('part 2', oxigen * co);
