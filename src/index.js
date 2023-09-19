import path from 'node:path';
import fs from 'node:fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './buildTree.js';

const getAbsPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const getData = (file) => fs.readFileSync(getAbsPath(file));
const getType = (file) => path.extname(file).slice(1);

const genDiff = (pathToFileOne, pathToFileTwo, formatName = 'stylish') => {
  const parsedFileOne = parse(getData(pathToFileOne), getType(pathToFileOne));
  const parsedFileTwo = parse(getData(pathToFileTwo), getType(pathToFileTwo));
  const tree = buildTree(parsedFileOne, parsedFileTwo);
  return format(tree, formatName);
};

export default genDiff;
