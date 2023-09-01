#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('filePath1')
  .arguments('filePath2')
  .option('-f, --format <type>', 'output format')
  .action((arg1, arg2) => genDiff(arg1, arg2));
program.parse();
