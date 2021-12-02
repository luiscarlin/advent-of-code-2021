import { readFileSync } from 'fs';

const part1 = () => {
  let lines = readFileSync('./2/2.in', 'utf8').split('\n');

  let position = 0;
  let depth = 0;

  lines.forEach((command) => {
    const [dir, amount] = command.split(' ');

    if (dir === 'forward') {
      position += Number(amount);
    }

    if (dir === 'down') {
      depth += Number(amount);
    }

    if (dir === 'up') {
      depth -= Number(amount);
    }
  });

  return position * depth;
};

const part2 = () => {
  let lines = readFileSync('./2/2.in', 'utf8').split('\n');

  let position = 0;
  let depth = 0;
  let aim = 0;

  lines.forEach((command) => {
    const [dir, amount] = command.split(' ');

    if (dir === 'forward') {
      position += Number(amount);
      depth += aim * Number(amount);
    }

    if (dir === 'down') {
      aim += Number(amount);
    }

    if (dir === 'up') {
      aim -= Number(amount);
    }
  });

  return position * depth;
};

console.log('part1', part1());
console.log('part2', part2());
