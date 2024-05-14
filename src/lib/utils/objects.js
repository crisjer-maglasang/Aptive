export const getNonEmptyObjectValues = (payload) => {
  const nonEmptyValues = Object.entries(payload).filter((item) => {
    const value = item[1];
    const isObjectValue = typeof value === 'object' && value !== null;
    const isArrayValue = Array.isArray(value);

    return isObjectValue
      ? isArrayValue ? value.length : Object.keys(value).length
      : Boolean(value);
  });

  return Object.fromEntries(nonEmptyValues);
};

export const removeFieldsFromObject = (obj, keys) => {
  return Object.keys(obj).reduce((acc, item) => {
    if (!keys.includes(item)) {
      acc[item] = obj[item];
    }

    return acc;
  }, {});
};

