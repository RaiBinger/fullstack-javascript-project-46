import yaml from 'js-yaml';

const parse = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unexpected file type: ${type}`);
  }
};

export default parse;
