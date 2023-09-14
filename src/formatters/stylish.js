import isObject from '../utils.js';

const indent = (depth, left = 2, tab = 4, type = ' ') => type.repeat(depth * tab - left);

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return `${value}`;
  }

  const currentIndent = indent(depth);
  const bracketIndent = indent(depth - 1);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}  ${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}  }`].join('\n');
};

const stylish = (tree) => {
  const fn = (innerTree, depth) => {
    const result = innerTree.flatMap((item) => {
      const {
        key,
        value,
        type,
        children,
        value1,
        value2,
      } = item;

      if (type === 'nested') {
        return `${indent(depth)}  ${key}: {\n${fn(children, depth + 1)}\n${indent(depth, 0)}}`;
      }

      if (type === 'deleted') {
        return `${indent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
      }

      if (type === 'added') {
        return `${indent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
      }

      if (type === 'unchanged') {
        return `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
      }

      return [`${indent(depth)}- ${key}: ${stringify(value1, depth + 1)}`, `${indent(depth)}+ ${key}: ${stringify(value2, depth + 1)}`];
    });

    return result.join('\n');
  };
  return `{\n${fn(tree, 1)}\n}`;
};

export default stylish;
