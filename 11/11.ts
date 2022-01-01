import { readFileSync } from 'fs';

const printGrid = (grid: number[][]) => grid.forEach((row) => console.log(row.join('')));

// dr, dc
const DIRECTIONS = {
  up: [-1, 0],
  upRight: [-1, 1],
  right: [0, 1],
  downRight: [1, 1],
  down: [1, 0],
  downLeft: [1, -1],
  left: [0, -1],
  upLeft: [-1, -1],
};

const getAllNeighbors = (row, col, grid) => {
  const neighbors = [];

  for (let direction in DIRECTIONS) {
    const [dr, dc] = DIRECTIONS[direction];
    const newRow = row + dr;
    const newCol = col + dc;

    if (newRow < 0 || newRow >= grid.length) {
      continue;
    }

    if (newCol < 0 || newCol >= grid[0].length) {
      continue;
    }

    neighbors.push([newRow, newCol]);
  }

  return neighbors;
};

const getAllNodesReadyToFlash = (flashedInThisStep = [], grid) => {
  const nodesReadyToFlash = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] > 9 && !flashedInThisStep.includes(`${row},${col}`)) {
        nodesReadyToFlash.push([row, col]);
      }
    }
  }

  return nodesReadyToFlash;
};

const flashNodes = (nodesToFlash, grid, flashedInThisStep) => {
  for (let [row, col] of nodesToFlash) {
    const neighbors = getAllNeighbors(row, col, grid);

    neighbors.forEach(([neighRow, neighCol]) => {
      if (!flashedInThisStep.includes(`${neighRow},${neighCol}`)) {
        grid[neighRow][neighCol] += 1;
      }
    });

    flashedInThisStep.push(`${row},${col}`);
    grid[row][col] = 0;
  }
};

function solve(partTwo = false) {
  let currentGrid = readFileSync('./11/11.in', 'utf8')
    .split('\n')
    .map((row) => row.split('').map(Number));

  let step = 1;
  const NUM_STEPS = partTwo ? 10000 : 100;

  let totalNumFlashes = 0;

  const totalNumberOfItems = currentGrid.length * currentGrid[0].length;

  while (step <= NUM_STEPS) {
    const flashedInThisStep = [];

    for (let row = 0; row < currentGrid.length; row++) {
      for (let col = 0; col < currentGrid[row].length; col++) {
        currentGrid[row][col] += 1;
      }
    }

    let nodesToFlash = getAllNodesReadyToFlash(flashedInThisStep, currentGrid);

    while (nodesToFlash.length > 0) {
      flashNodes(nodesToFlash, currentGrid, flashedInThisStep);
      totalNumFlashes += nodesToFlash.length;

      nodesToFlash = getAllNodesReadyToFlash(flashedInThisStep, currentGrid);
    }

    if (partTwo) {
      console.log(
        'step:',
        step,
        'total:',
        totalNumberOfItems,
        'flashed:',
        flashedInThisStep.length,
        'percent flashed:',
        (flashedInThisStep.length / totalNumberOfItems) * 100,
      );

      if (flashedInThisStep.length === totalNumberOfItems) {
        return step;
      }
    }

    step += 1;
  }
  return totalNumFlashes;
}

console.log('part 1:', solve());
console.log('part 2:', solve(true));
