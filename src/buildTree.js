import _ from 'lodash';

const buildTree = (partOne, partTwo) => {
  const keysFileOne = Object.keys(partOne);
  const keysFileTwo = Object.keys(partTwo);
  const allKeys = _.sortBy(_.uniq(keysFileOne.concat(keysFileTwo)));
  const result = allKeys.map((key) => {
    if (_.isObject(partOne[key]) && _.isObject(partTwo[key])) {
      return { key, children: buildTree(partOne[key], partTwo[key]), type: 'nested' };
    }

    if (!_.has(partTwo, key)) {
      return { key, value: partOne[key], type: 'deleted' };
    }

    if (!_.has(partOne, key)) {
      return { key, value: partTwo[key], type: 'added' };
    }

    if (partTwo[key] === partOne[key]) {
      return { key, value: partOne[key], type: 'unchanged' };
    }
    return {
      key,
      value1: partOne[key],
      value2: partTwo[key],
      type: 'changed',
    };
  });

  return result;
};

export default buildTree;
