import { readFileSync } from 'fs';

function part1(): number {
  let lines = readFileSync('./4/4.in', 'utf8').split('\n\n');

  const nums = lines[0].split(',').map(Number);

  let cards = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    const card = line
      .split('\n')
      .map((line) => line.replaceAll('  ', ' '))
      .map((line) => line.split(' ').map(Number));

    cards.push(card);
  }

  const hasCompletedRow = (card: any) => {
    for (let row = 0; row < card.length; row++) {
      let isRowCompleted = true;

      for (let col = 0; col < 5; col++) {
        if (card[row][col] !== -1) {
          isRowCompleted = false;
          break;
        }
      }

      if (isRowCompleted) {
        return true;
      }
    }

    return false;
  };

  const hasCompletedCol = (card: any) => {
    for (let col = 0; col < 5; col++) {
      let isColCompleted = true;

      for (let row = 0; row < card.length; row++) {
        if (card[row][col] !== -1) {
          isColCompleted = false;
          break;
        }
      }

      if (isColCompleted) {
        return true;
      }
    }

    return false;
  };

  const markNumber = (num: number, card: any) =>
    card.map((row: any) => row.map((cardNum: number) => (cardNum === num ? -1 : cardNum)));

  let winnerCard = [];
  let lastCalledNumber = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    for (let x = 0; x < cards.length; x++) {
      cards[x] = markNumber(num, cards[x]);
      const card = cards[x];

      if (hasCompletedCol(card) || hasCompletedRow(card)) {
        winnerCard = card;
        lastCalledNumber = num;
        break;
      }
    }

    if (winnerCard.length !== 0) {
      break;
    }
  }

  let sum = 0;

  for (let row = 0; row < winnerCard.length; row++) {
    for (let col = 0; col < 5; col++) {
      if (winnerCard[row][col] !== -1) {
        sum += winnerCard[row][col];
      }
    }
  }

  return sum * lastCalledNumber;
}

function part2(): number {
  let lines = readFileSync('./4/4.in', 'utf8').split('\n\n');

  const nums = lines[0].split(',').map(Number);

  let cards = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    const card = line
      .split('\n')
      .map((line) => line.replaceAll('  ', ' '))
      .map((line) => line.split(' ').map(Number));

    cards.push(card);
  }

  const hasCompletedRow = (card: any) => {
    for (let row = 0; row < card.length; row++) {
      let isRowCompleted = true;

      for (let col = 0; col < 5; col++) {
        if (card[row][col] !== -1) {
          isRowCompleted = false;
          break;
        }
      }

      if (isRowCompleted) {
        return true;
      }
    }

    return false;
  };

  const hasCompletedCol = (card: any) => {
    for (let col = 0; col < 5; col++) {
      let isColCompleted = true;

      for (let row = 0; row < card.length; row++) {
        if (card[row][col] !== -1) {
          isColCompleted = false;
          break;
        }
      }

      if (isColCompleted) {
        return true;
      }
    }

    return false;
  };

  const markNumber = (num: number, card: any) =>
    card.map((row: any) => row.map((cardNum: number) => (cardNum === num ? -1 : cardNum)));

  let winnerCardIndexList: number[] = [];
  let lastCalledNumber = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    for (let x = 0; x < cards.length; x++) {
      if (winnerCardIndexList.length === cards.length) {
        break;
      }

      if (winnerCardIndexList.includes(x)) {
        continue;
      }

      cards[x] = markNumber(num, cards[x]);
      const card = cards[x];

      if (hasCompletedCol(card) || hasCompletedRow(card)) {
        winnerCardIndexList.push(x);
        lastCalledNumber = num;
      }
    }

    if (winnerCardIndexList.length === cards.length) {
      break;
    }
  }

  let sum = 0;

  const lastCard = cards[winnerCardIndexList[winnerCardIndexList.length - 1]];

  for (let row = 0; row < lastCard.length; row++) {
    for (let col = 0; col < 5; col++) {
      if (lastCard[row][col] !== -1) {
        sum += lastCard[row][col];
      }
    }
  }

  return sum * lastCalledNumber;
}

console.log('part 1', part1());
console.log('part 2', part2());
