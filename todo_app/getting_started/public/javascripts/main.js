// QuerySelector utility function
const qs = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

const match = (query, item) => {
  return !query || Object.keys(query).every(k => item[k] === query[k]);
}
