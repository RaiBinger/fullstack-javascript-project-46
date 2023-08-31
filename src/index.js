import fs from 'node:fs';
import path from 'node:path';

const getAbsPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const getParsed = (file) => JSON.parse(file);

const genDiff = (pathToFileOne, pathToFileTwo) => {
  const fileOneContent = fs.readFileSync(getAbsPath(pathToFileOne));
  const fileTwoContent = fs.readFileSync(getAbsPath(pathToFileTwo));

  const parsedFileOne = getParsed(fileOneContent);
  const parsedFileTwo = getParsed(fileTwoContent);

  const keysFileOne = Object.keys(parsedFileOne).sort();
  const keysFileTwo = Object.keys(parsedFileTwo).sort();

  const checkedFileOneByFileTwo = keysFileOne.reduce((acc, keyFileOne) => {
    let string;
    if (!parsedFileTwo.hasOwnProperty(keyFileOne)) {
      string = `  - ${keyFileOne}: ${parsedFileOne[keyFileOne]}`;
    }
    if (parsedFileTwo.hasOwnProperty(keyFileOne)) {
      if (parsedFileTwo[keyFileOne] === parsedFileOne[keyFileOne]) {
        string = `    ${keyFileOne}: ${parsedFileOne[keyFileOne]}`;
      } else {
        string = [`  - ${keyFileOne}: ${parsedFileOne[keyFileOne]}`, `  + ${keyFileOne}: ${parsedFileTwo[keyFileOne]}`];
      }
    }
    return [...acc, string];
  }, []).flat();
  
  const checkedFileTwoByFileOne = keysFileTwo.reduce((acc, keyFileTwo) => {
    if (!parsedFileOne.hasOwnProperty(keyFileTwo)) {
      return [...acc, `  + ${keyFileTwo}: ${parsedFileTwo[keyFileTwo]}`];
    }
    return acc;
  }, checkedFileOneByFileTwo);
  return console.log(`{\n${checkedFileTwoByFileOne.join('\n')}\n}`);
};
export default genDiff;