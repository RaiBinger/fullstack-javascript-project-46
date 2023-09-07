import path from 'node:path';
import fs from 'node:fs';
import parse from './parsers.js';

const unique = (arr) => arr.reduce((acc, item) => (!acc.includes(item) ? [...acc, item] : acc), []);
const getAbsPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const getData = (file) => fs.readFileSync(getAbsPath(file));
const getType = (file) => path.extname(file).slice(1);

const isObject = (obj) => typeof obj === 'object' && obj !== null;
const indent = (depth, type = ' ') => type.repeat(depth * 4 - 2);

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return `${value}`;
  }

  const currentIndent = indent(depth);
  const bracketIndent = indent(depth - 1);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}  ${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}  }`,
  ].join('\n');
};

const genDiff = (pathToFileOne, pathToFileTwo) => {
  const parsedFileOne = parse(getData(pathToFileOne), getType(pathToFileOne));
  const parsedFileTwo = parse(getData(pathToFileTwo), getType(pathToFileTwo));
  const fn = (partOne, partTwo, depth) => {
    const keysFileOne = Object.keys(partOne);
    const keysFileTwo = Object.keys(partTwo);
    const allKeys = unique(keysFileOne.concat(keysFileTwo).sort());
    const checkAllKeys = allKeys.flatMap((key) => {
      if (isObject(partOne[key]) && isObject(partTwo[key])) {
        return `${indent(depth)}  ${key}: {\n${fn(partOne[key], partTwo[key], depth + 1)}\n${indent(depth)}  }`;
      }
      if (!Object.prototype.hasOwnProperty.call(partTwo, key)) {
        return `${indent(depth)}- ${key}: ${stringify(partOne[key], depth + 1)}`;
      }

      if (!Object.prototype.hasOwnProperty.call(partOne, key)) {
        return `${indent(depth)}+ ${key}: ${stringify(partTwo[key], depth + 1)}`;
      }

      if (partTwo[key] === partOne[key]) {
        return `${indent(depth)}  ${key}: ${stringify(partOne[key], depth + 1)}`;
      }

      return [`${indent(depth)}- ${key}: ${stringify(partOne[key], depth + 1)}`, `${indent(depth)}+ ${key}: ${stringify(partTwo[key], depth + 1)}`];
    });

    return checkAllKeys.join('\n');
  };
  return `{\n${fn(parsedFileOne, parsedFileTwo, 1)}\n}`;
};

export default genDiff;
