import _ from 'lodash';
import isObject from './utils.js';

const unique = (arr) => arr.reduce((acc, item) => (!acc.includes(item) ? [...acc, item] : acc), []);

const getDiff = (partOne, partTwo) => {
  const keysFileOne = Object.keys(partOne);
  const keysFileTwo = Object.keys(partTwo);
  const allKeys = _.sortBy(unique(keysFileOne.concat(keysFileTwo)));
  const result = allKeys.map((key) => {
    if (isObject(partOne[key]) && isObject(partTwo[key])) {
      return { key, children: getDiff(partOne[key], partTwo[key]), type: 'nested' };
    }

    if (!Object.prototype.hasOwnProperty.call(partTwo, key)) {
      return { key, value: partOne[key], type: 'deleted' };
    }

    if (!Object.prototype.hasOwnProperty.call(partOne, key)) {
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

export default getDiff;
