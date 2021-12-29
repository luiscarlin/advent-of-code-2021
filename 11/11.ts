import { readFileSync } from 'fs';
import { exit } from 'process';

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
      if (flashedInThisStep) grid[neighRow][neighCol] += 1;
    });

    flashedInThisStep.push(`${row},${col}`);
  }
};

let currentGrid = readFileSync('./11/test.in', 'utf8')
  .split('\n')
  .map((row) => row.split('').map(Number));

let step = 0;
// const NUM_STEPS = 100
const NUM_STEPS = 2;

while (step !== NUM_STEPS) {
  console.log('step', step);

  const flashedInThisStep = [];

  console.log('\nbefore:\n');

  printGrid(currentGrid);

  for (let row = 0; row < currentGrid.length; row++) {
    for (let col = 0; col < currentGrid[row].length; col++) {
      currentGrid[row][col] += 1;
    }
  }

  let nodesToFlash = getAllNodesReadyToFlash(flashedInThisStep, currentGrid);

  console.log(nodesToFlash);

  while (nodesToFlash.length > 0) {
    flashNodes(nodesToFlash, currentGrid, flashedInThisStep);
    console.log(flashedInThisStep);

    nodesToFlash = getAllNodesReadyToFlash(flashedInThisStep, currentGrid);
    exit();
  }

  // for (let row = 0; row < currentGrid.length; row++) {
  //   for (let col = 0; col < currentGrid[row].length; col++) {
  //     if (currentGrid[row][col] > 9) {
  //       // get all neighbors
  //       const neighbors = getAllNeighbors(row, col, currentGrid);

  //       neighbors.forEach(([neighRow, neighCol]) => {});

  //       console.log('neighbors', neighbors);
  //     }
  //   }
  // }

  console.log('\nafter:\n');

  printGrid(currentGrid);

  step += 1;
}
