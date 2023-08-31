import fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const getAbsPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const getParsed = (file) => JSON.parse(file);

const genDiff = (pathToFileOne, pathToFileTwo) => {
  const fileOneContent = fs.readFileSync(getAbsPath(pathToFileOne));
  const fileTwoContent = fs.readFileSync(getAbsPath(pathToFileTwo));

  const parsedFileOne = getParsed(fileOneContent);
  const parsedFileTwo = getParsed(fileTwoContent);

  const keysFileOne = Object.keys(parsedFileOne);
  const keysFileTwo = Object.keys(parsedFileTwo);
  const allKeys = _.uniq(keysFileOne.concat(keysFileTwo).sort());
  
  const checkedFileOneByFileTwo = allKeys.flatMap((key) => {
    let string;
    if (!parsedFileTwo.hasOwnProperty(key)) {
      return `  - ${key}: ${parsedFileOne[key]}`;
    }

    if (!parsedFileOne.hasOwnProperty(key)) {
      return `  + ${key}: ${parsedFileTwo[key]}`;
    }

    if (parsedFileTwo[key] === parsedFileOne[key]) {
      return `    ${key}: ${parsedFileOne[key]}`;
    }

    return [`  - ${key}: ${parsedFileOne[key]}`, `  + ${key}: ${parsedFileTwo[key]}`];
  });

  return console.log(`{\n${checkedFileOneByFileTwo.join('\n')}\n}`);
};
export default genDiff;