export const removeTrailingSpaces = (value) => {
  return value.trim();
};

export const removeNewLinesAndTrailingSpaces = (value) => {
  return value.replace(/\n/g, '').trim();
};

export const formatNumberToCurrencyString = (value, numberOfFractionDigits) => {
  numberOfFractionDigits = numberOfFractionDigits ? numberOfFractionDigits : 0;
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  const fractionString = Number(absoluteValue).toLocaleString(
    process.env.REACT_APP_LOCALE,
    { maximumFractionDigits: numberOfFractionDigits, minimumFractionDigits: numberOfFractionDigits },
  );

  return `${isNegative ? '-' : ''}$${fractionString}`;
};

export const addPluralS = (value, count) => {
  return count > 1 ? `${value}s` : value;
};
