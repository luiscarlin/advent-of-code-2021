import { readFileSync } from 'fs';
import _ from 'lodash';

function part1() {
  let line = readFileSync('./6/6.in', 'utf8').split('\n')[0];

  let fishList = line.split(',').map(Number);

  let day = 0;

  while (day !== 80) {
    let fishToAdd = 0;

    fishList = fishList.map((fish) => {
      if (fish === 0) {
        fishToAdd++;
        return 6;
      }
      return fish - 1;
    });

    _.times(fishToAdd, () => fishList.push(8));

    day++;
  }

  return fishList.length;
}

function part2() {
  let line = readFileSync('./6/6.in', 'utf8').split('\n')[0];

  let fishList = line.split(',').map(Number);

  let prevDay = {};

  for (let fish of fishList) {
    prevDay[fish] = prevDay[fish] ? prevDay[fish] + 1 : 1;
  }

  let day = 0;

  while (day !== 256) {
    let nextDay = {};

    for (let [fish, count] of Object.entries(prevDay)) {
      fish = Number(fish);

      if (fish === 0) {
        nextDay[6] = nextDay[6] ? nextDay[6] + count : count;
        nextDay[8] = nextDay[8] ? nextDay[8] + count : count;
      } else {
        nextDay[fish - 1] = nextDay[fish - 1] ? nextDay[fish - 1] + count : count;
      }
    }

    prevDay = _.cloneDeep(nextDay);

    day++;
  }

  return _.sum(Object.values(prevDay));
}

console.log('part1', part1());
console.log('part2', part2());
