export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, current) => {
    const value = String(current[key]);
    if (!result[value]) {
      result[value] = [];
    }
    result[value].push(current);
    return result;
  }, {} as Record<string, T[]>);
}
