import { readFileSync } from 'fs';
import _ from 'lodash';

function part1() {
  let lines = readFileSync('./5/5.in', 'utf8').split('\n');

  const points = {};

  for (let line of lines) {
    const [x1, y1, x2, y2] = line
      .split(' -> ')
      .map((point) => point.split(','))
      .flat()
      .map(Number);

    if (x1 === x2 || y1 === y2) {
      for (let x of _.range(x1, x1 < x2 ? x2 + 1 : x2 - 1)) {
        for (let y of _.range(y1, y1 < y2 ? y2 + 1 : y2 - 1)) {
          // console.log(x, y);

          points[[x, y]] = points[[x, y]] ? points[[x, y]] + 1 : 1;
        }
      }
    }
  }

  return Object.values(points).reduce((acc, curr) => {
    return curr >= 2 ? acc + 1 : acc;
  }, 0);
}

function part2() {
  let lines = readFileSync('./5/5.in', 'utf8').split('\n');

  const points = {};

  for (let line of lines) {
    const [x1, y1, x2, y2] = line
      .split(' -> ')
      .map((point) => point.split(','))
      .flat()
      .map(Number);

    // console.log(line);

    if (x1 === x2 || y1 === y2) {
      for (let x of _.range(x1, x1 < x2 ? x2 + 1 : x2 - 1)) {
        for (let y of _.range(y1, y1 < y2 ? y2 + 1 : y2 - 1)) {
          points[[x, y]] = points[[x, y]] ? points[[x, y]] + 1 : 1;
        }
      }
    } else {
      let xDown = x1 > x2;
      let yDown = y1 > y2;

      let y = y1;

      if (xDown) {
        for (let x = x1; x >= x2; x--) {
          points[[x, y]] = points[[x, y]] ? points[[x, y]] + 1 : 1;

          y = yDown ? y - 1 : y + 1;
        }
      } else {
        for (let x = x1; x <= x2; x++) {
          points[[x, y]] = points[[x, y]] ? points[[x, y]] + 1 : 1;

          y = yDown ? y - 1 : y + 1;
        }
      }
    }
  }

  return Object.values(points).reduce((acc, curr) => {
    return curr >= 2 ? acc + 1 : acc;
  }, 0);
}

console.log('part 1', part1());
console.log('part 2', part2());
