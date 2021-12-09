import { readFileSync } from 'fs';

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

function part2() {
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

// console.log('part 1', part1());
console.log('part 1', part2());
