import { readFileSync } from 'fs';
import _ from 'lodash';

function part1() {
  let line = readFileSync('./7/7.in', 'utf8').split('\n')[0].split(',').map(Number);

  const sortedLine = _.sortBy(line);

  const mid = sortedLine[sortedLine.length / 2];
  let answer = 0;

  for (let num of sortedLine) {
    answer += Math.abs(num - mid);
  }

  return answer;
}

function part2() {
  let line = readFileSync('./7/7.in', 'utf8').split('\n')[0].split(',').map(Number);

  const sortedLine = _.sortBy(line);

  const allFuelCosts = [];

  for (let meet of sortedLine) {
    const fuelCost = _.sum(
      sortedLine.map((position) => (Math.abs(position - meet) * (1 + Math.abs(position - meet))) / 2),
    );

    allFuelCosts.push(fuelCost);
  }

  return _.min(allFuelCosts);
}

console.log('part 1', part1());
console.log('part 2', part2());
