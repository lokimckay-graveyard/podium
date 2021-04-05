export const isPopulatedArray = (arr) => Array.isArray(arr) && arr.length > 0;

export const sortByField = (field) => {
  return ({ [field]: a }, { [field]: b }) => {
    return a - b;
  };
};

export const lineCount = (str) =>
  isPopulatedArray(str) ? str.length : str.split(/\r\n|\r|\n/).length;

export const cssJoin = (classNames) => classNames.filter(Boolean).join(" ");

export const generateArray = ({ value, copies }) => {
  return Array.from(Array(copies), (x, index) => {
    return typeof value === "function" ? value(index) : value;
  });
};
