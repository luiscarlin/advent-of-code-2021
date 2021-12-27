import { readFileSync } from 'fs';

const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

let lines = readFileSync('./10/10.in', 'utf8').split('\n');

let errorScore = 0;

for (let line of lines) {
  let stack = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (['<', '[', '(', '{'].includes(char)) {
      stack.push(char);
      continue;
    }

    // closing
    const lastOpen = stack.pop();

    if (
      (char === '>' && lastOpen !== '<') ||
      (char === ']' && lastOpen !== '[') ||
      (char === ')' && lastOpen !== '(') ||
      (char === '}' && lastOpen !== '{')
    ) {
      errorScore += POINTS[char];
      break;
    }
  }
}

console.log('part 1', errorScore);
