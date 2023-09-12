#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('filePath1')
  .arguments('filePath2')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((arg1, arg2, options) => console.log(genDiff(arg1, arg2, options.format)));
program.parse();
