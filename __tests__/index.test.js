import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedContent = fs.readFileSync(getFixturePath('expected_file.txt', 'utf-8'));

test('genDiff', () => {
  expect(genDiff(getFixturePath('./file1.json'), getFixturePath('./file2.json'))).toBe(String(expectedContent));
});
