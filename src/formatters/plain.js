import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const fn = (innerTree, path) => {
    const result = innerTree.flatMap((item) => {
      const {
        key,
        value,
        type,
        children,
        value1,
        value2,
      } = item;

      const keyPath = path ? `${path}.${key}` : key;

      if (type === 'nested') {
        return fn(children, keyPath);
      }

      if (type === 'deleted') {
        return `Property '${keyPath}' was removed`;
      }

      if (type === 'added') {
        return `Property '${keyPath}' was added with value: ${stringify(value)}`;
      }

      if (type === 'changed') {
        return `Property '${keyPath}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      }
      return [];
    });

    return result.join('\n');
  };
  return `${fn(tree)}`;
};

export default plain;
