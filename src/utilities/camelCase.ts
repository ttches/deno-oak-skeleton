const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("_", ""));

const camelKeys = (obj: { [key: string]: any }) =>
  Object.entries(obj).reduce(
    (formatted, [key, value]) => ({ ...formatted, [snakeToCamel(key)]: value }),
    {}
  );
export { camelKeys, snakeToCamel };
