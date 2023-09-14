import plain from './plain.js';
import stylish from './stylish.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(`Unknown format name: ${formatName}`);
  }
};

export default format;
