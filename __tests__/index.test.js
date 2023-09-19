import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylish = fs.readFileSync(getFixturePath('expected_stylish.txt'));
const expectedPlain = fs.readFileSync(getFixturePath('expected_plain.txt'));

test.each([
  [getFixturePath('./file1.json'), getFixturePath('./file2.json')],
  [getFixturePath('./file1.yaml'), getFixturePath('./file2.yml')],
])('genDiff %s %s', (filePath1, filePath2) => {
  expect(genDiff(filePath1, filePath2)).toBe(String(expectedStylish));
  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(String(expectedStylish));
  expect(genDiff(filePath1, filePath2, 'plain')).toBe(String(expectedPlain));
  const diff = genDiff(filePath1, filePath2, 'json');
  expect(() => JSON.parse(diff)).not.toThrow();
});
