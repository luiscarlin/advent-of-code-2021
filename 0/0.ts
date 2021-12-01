import { readFileSync } from 'fs';

let lines = readFileSync('./%DAY_NUM%/%DAY_NUM%.in', 'utf8').split('\n');

console.log(lines);
