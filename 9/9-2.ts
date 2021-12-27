import { readFileSync } from 'fs';

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

const printGrid = (grid: number[][]) => grid.forEach((row) => console.log(row.join('')));

function floodFill(grid: number[][], visited: number[][], row: number, col: number): number {
  if (visited[row][col] === 1) {
    // already visited, so don't count this one in the size
    return 0;
  }

  // set this one as visited
  visited[row][col] = 1;

  // take into account this point
  let size = 1;

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

    size += floodFill(grid, visited, neighborIndexRow, neighborIndexCol);
  }

  return size;
}

function part2() {
  let grid = readFileSync('./9/9.in', 'utf8')
    .split('\n')
    .filter((x) => x)
    .map((row) => row.split('').map(Number));

  // 1 = visited
  let visited = grid.map((row) => row.map((num) => (num === 9 ? 1 : 0)));

  // printGrid(visited);

  let basinSizes = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (visited[row][col] === 1) {
        continue;
      }

      const size = floodFill(grid, visited, row, col);

      basinSizes.push(size);
    }
  }

  // printGrid(visited);

  const [a, b, c] = basinSizes.sort((a, b) => b - a).slice(0, 3);

  return a * b * c;
}

console.log('part 2', part2());
