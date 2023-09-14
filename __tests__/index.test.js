import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedContent = (nameFile) => fs.readFileSync(getFixturePath(nameFile));

test('genDiff JSON stylish', () => {
  expect(genDiff(getFixturePath('./file1.json'), getFixturePath('./file2.json'))).toBe(String(expectedContent('expected_stylish.txt')));
});

test('genDiff YAML stylish', () => {
  expect(genDiff(getFixturePath('./file1.yaml'), getFixturePath('./file2.yml'))).toBe(String(expectedContent('expected_stylish.txt')));
});

test('genDiff JSON plain', () => {
  expect(genDiff(getFixturePath('./file1.json'), getFixturePath('./file2.json'), 'plain')).toBe(String(expectedContent('expected_plain.txt')));
});

test('genDiff YAML plain', () => {
  expect(genDiff(getFixturePath('./file1.yaml'), getFixturePath('./file2.yml'), 'plain')).toBe(String(expectedContent('expected_plain.txt')));
});
