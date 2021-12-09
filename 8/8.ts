import { readFileSync } from 'fs';
import _ from 'lodash';
function part1() {
  let lines = readFileSync('./8/8.in', 'utf8')
    .split('\n')
    .map((line) => line.split(' | ')[1])
    .map((line) => line.split(' '));

  let count = 0;

  lines.flat().forEach((segment) => {
    if ([2, 4, 3, 7].includes(segment.length)) {
      count++;
    }
  });

  return count;
}

function includes(a, b) {
  const set = new Set([...a]);
  return [...b].every((x) => set.has(x));
}

function part2() {
  let lines = readFileSync('./8/8.in', 'utf8')
    .split('\n')
    .map((line) => line.split(' | '))
    .map((p) => p.map((a) => a.split(' ').map((c) => _.sortBy(c).join(''))));

  let total = 0;

  for (let [signal, output] of lines) {
    const matches = {
      1: signal.find((x) => x.length === 2),
      4: signal.find((x) => x.length === 4),
      7: signal.find((x) => x.length === 3),
      8: signal.find((x) => x.length === 7),
    };

    matches[6] = signal.find((x) => x.length === 6 && !includes(x, matches[1]));
    matches[9] = signal.find((x) => x.length === 6 && x !== matches[6] && includes(x, matches[4]));
    matches[0] = signal.find((x) => x.length === 6 && x !== matches[6] && x !== matches[9]);

    matches[3] = signal.find((x) => x.length === 5 && includes(x, matches[1]));
    matches[5] = signal.find((x) => x.length === 5 && x !== matches[3] && includes(matches[6], x));
    matches[2] = signal.find((x) => x.length === 5 && x !== matches[3] && x !== matches[5]);

    const translationTable = Object.fromEntries(Object.entries(matches).map((x) => x.reverse()));

    const translated = Number(output.map((signal) => translationTable[signal]).join(''));

    total += translated;
  }

  return total;
}

console.log('part 1', part1());
console.log('part 1', part2());
