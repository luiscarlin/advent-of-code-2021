import { readFileSync } from 'fs';

let grid = readFileSync('./9/9.in', 'utf8')
  .split('\n')
  .map((row) => row.split('').map(Number));

const DIR = {
  up: {
    dr: -1,
    dc: 0,
  },
  right: {
    dr: 0,
    dc: 1,
  },
  down: {
    dr: 1,
    dc: 0,
  },
  left: {
    dr: 0,
    dc: -1,
  },
};

let riskLevels = 0;

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    const currentPosition = grid[row][col];
    let allNeighborsGreater = true;

    for (let direction in DIR) {
      const neighborIndexRow = row + DIR[direction].dr;
      const neighborIndexCol = col + DIR[direction].dc;

      if (
        neighborIndexRow < 0 ||
        neighborIndexCol < 0 ||
        neighborIndexRow >= grid.length ||
        neighborIndexCol >= grid[row].length
      ) {
        continue;
      }

      const neighbor = grid[neighborIndexRow][neighborIndexCol];

      if (neighbor <= currentPosition) {
        allNeighborsGreater = false;
        break;
      }
    }

    if (allNeighborsGreater) {
      riskLevels += currentPosition + 1;
    }
  }
}

console.log(riskLevels);
