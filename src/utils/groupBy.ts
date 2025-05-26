export const groupBy = (array: any[], key: string): Record<string, any[]> => {
  return array.reduce((result, current) => {
    const value = current[key];
    if (!result[value]) {
      result[value] = [];
    }
    result[value].push(current);
    return result;
  }, {});
};
