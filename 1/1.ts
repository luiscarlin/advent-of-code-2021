import { readFileSync } from 'fs';

let numList = readFileSync('./1/1.in', 'utf8').split('\n').map(Number);
let numIncreased = 0;

for (let i = 1; i < numList.length; i += 1) {
  if (numList[i] > numList[i - 1]) {
    numIncreased += 1;
  }
}

console.log('part 1', numIncreased);

let sums = [];
let sumsIncreased = 0;

for (let i = 2; i < numList.length; i += 1) {
  sums.push(numList[i] + numList[i - 1] + numList[i - 2]);
}

for (let i = 1; i < sums.length; i += 1) {
  if (sums[i] > sums[i - 1]) {
    sumsIncreased += 1;
  }
}

console.log('part 2', sumsIncreased);
