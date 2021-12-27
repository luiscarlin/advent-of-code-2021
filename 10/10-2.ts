import { readFileSync } from 'fs';

const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const COMPLETED_SCORES = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

let lines = readFileSync('./10/10.in', 'utf8').split('\n');

let score = 0;
let completeScores = [];

for (let line of lines) {
  let stack = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    let lastOpen;

    if (['<', '[', '(', '{'].includes(char)) {
      stack.push(char);
    } else {
      // closing
      lastOpen = stack.pop();

      if (
        (char === '>' && lastOpen !== '<') ||
        (char === ']' && lastOpen !== '[') ||
        (char === ')' && lastOpen !== '(') ||
        (char === '}' && lastOpen !== '{')
      ) {
        score += POINTS[char];
        break;
      }
    }

    if (i === line.length - 1 && stack.length > 0) {
      // try to complete it
      let completedScore = 0;

      for (let open of stack.reverse()) {
        completedScore *= 5;

        completedScore += COMPLETED_SCORES[open];
      }

      completeScores.push(completedScore);
    }
  }
}

const midScore = completeScores.sort((a, b) => b - a)[(completeScores.length - 1) / 2];

console.log('part 2', midScore);
