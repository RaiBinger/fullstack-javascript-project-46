import fs from 'node:fs';
import path from 'node:path';

const getAbsPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const parsed = (file) => JSON.parse(file);

const genDiff = (pathToFile1, pathToFile2) => {
  const file1Content = fs.readFileSync(getAbsPath(pathToFile1));
  const file2Content = fs.readFileSync(getAbsPath(pathToFile2));

  const parsedFile1 = parsed(file1Content);
  const parsedFile2 = parsed(file2Content);

  // console.log(parsedFile1);
  // console.log(parsedFile2);

  const keysFile1 = Object.keys(parsedFile1).sort();
  const keysFile2 = Object.keys(parsedFile2).sort();

  const checkedFile1 = keysFile1.reduce((acc, keyFile1) => {
    let tmp;
    if (!parsedFile2.hasOwnProperty(keyFile1)) {
      tmp = `  - ${keyFile1}: ${parsedFile1[keyFile1]}`;
    }
    if (parsedFile2.hasOwnProperty(keyFile1)) {
      if (parsedFile2[keyFile1] === parsedFile1[keyFile1]) {
        tmp = `    ${keyFile1}: ${parsedFile1[keyFile1]}`;
      } else {
        tmp = [`  - ${keyFile1}: ${parsedFile1[keyFile1]}`, `  + ${keyFile1}: ${parsedFile2[keyFile1]}`];
      }
    }
    return [...acc, tmp];
  }, []).flat();
  
  const checkedFile2 = keysFile2.reduce((acc, keyFile2) => {
    if (!parsedFile1.hasOwnProperty(keyFile2)) {
      return [...acc, `  + ${keyFile2}: ${parsedFile2[keyFile2]}`];
    }
    return acc;
  }, checkedFile1);
  return console.log(`{\n${checkedFile2.join('\n')}\n}`);
};
export default genDiff;