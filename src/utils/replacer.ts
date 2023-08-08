const bigNumberReplacer = (key: any, value: any): any => {
  if (value && typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

export const stringifyBigInts = (data: any): string => {
  return JSON.stringify(data, bigNumberReplacer);
};
