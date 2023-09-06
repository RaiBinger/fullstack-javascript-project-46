import yaml from 'js-yaml';


const parse = (data, type) => {
  let result;
  if (type === 'json') {
    result = JSON.parse(data);
  } else if (type === 'yml' || type === 'yaml') {
    result = yaml.load(data);
  }
  return result;
};

export default parse;
