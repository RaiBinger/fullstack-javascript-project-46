import path from 'node:path';
import fs from 'node:fs';
import parse from './parsers.js';
import stylish from './stylish.js';

const unique = (arr) => arr.reduce((acc, item) => (!acc.includes(item) ? [...acc, item] : acc), []);
const getAbsPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const getData = (file) => fs.readFileSync(getAbsPath(file));
const getType = (file) => path.extname(file).slice(1);

const isObject = (obj) => typeof obj === 'object' && obj !== null;

const genDiff = (pathToFileOne, pathToFileTwo) => {
  const parsedFileOne = parse(getData(pathToFileOne), getType(pathToFileOne));
  const parsedFileTwo = parse(getData(pathToFileTwo), getType(pathToFileTwo));
  const fn = (partOne, partTwo) => {
    const keysFileOne = Object.keys(partOne);
    const keysFileTwo = Object.keys(partTwo);
    const allKeys = unique(keysFileOne.concat(keysFileTwo).sort());
    const result = allKeys.map((key) => {
      if (isObject(partOne[key]) && isObject(partTwo[key])) {
        return { key, children: fn(partOne[key], partTwo[key]), type: 'nested' };
      }
      if (!Object.prototype.hasOwnProperty.call(partTwo, key)) {
        return { key, value: partOne[key], type: 'deleted' };
      }

      if (!Object.prototype.hasOwnProperty.call(partOne, key)) {
        return { key, value: partTwo[key], type: 'added' };
      }

      if (partTwo[key] === partOne[key]) {
        return { key, value: partOne[key], type: 'unchanged' };
      }
      return {
        key,
        value1: partOne[key],
        value2: partTwo[key],
        type: 'changed',
      };
    });

    return result;
  };
  const tree = fn(parsedFileOne, parsedFileTwo);
  return stylish(tree);
};

export default genDiff;
