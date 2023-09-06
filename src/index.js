import path from 'node:path';
import fs from 'node:fs';
import parse from './parsers.js';

const unique = (arr) => arr.reduce((acc, item) => (!acc.includes(item) ? [...acc, item] : acc), []);
const getAbsPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const getData = (file) => fs.readFileSync(getAbsPath(file));
const getType = (file) => path.extname(file).slice(1);

const genDiff = (pathToFileOne, pathToFileTwo) => {
  const parsedFileOne = parse(getData(pathToFileOne), getType(pathToFileOne));
  const parsedFileTwo = parse(getData(pathToFileTwo), getType(pathToFileTwo));

  const keysFileOne = Object.keys(parsedFileOne);
  const keysFileTwo = Object.keys(parsedFileTwo);
  const allKeys = unique(keysFileOne.concat(keysFileTwo).sort());

  const checkAllKeys = allKeys.flatMap((key) => {
    if (!Object.prototype.hasOwnProperty.call(parsedFileTwo, key)) {
      return `  - ${key}: ${parsedFileOne[key]}`;
    }

    if (!Object.prototype.hasOwnProperty.call(parsedFileOne, key)) {
      return `  + ${key}: ${parsedFileTwo[key]}`;
    }

    if (parsedFileTwo[key] === parsedFileOne[key]) {
      return `    ${key}: ${parsedFileOne[key]}`;
    }

    return [`  - ${key}: ${parsedFileOne[key]}`, `  + ${key}: ${parsedFileTwo[key]}`];
  });

  return `{\n${checkAllKeys.join('\n')}\n}`;
};

export default genDiff;
