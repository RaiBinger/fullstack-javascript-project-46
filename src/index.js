import fs from 'node:fs';
import path from 'node:path';
// import _ from 'lodash';

const getAbsPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const getParsed = (file) => JSON.parse(file);
const unique = (arr) => arr.reduce((acc, item) => (!acc.includes(item) ? [...acc, item] : acc), []);

const genDiff = (pathToFileOne, pathToFileTwo) => {
  const fileOneContent = fs.readFileSync(getAbsPath(pathToFileOne));
  const fileTwoContent = fs.readFileSync(getAbsPath(pathToFileTwo));

  const parsedFileOne = getParsed(fileOneContent);
  const parsedFileTwo = getParsed(fileTwoContent);

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

  return console.log(`{\n${checkAllKeys.join('\n')}\n}`);
};

export default genDiff;
