/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The string with the first letter of each word capitalized
 */
export function capitalizeWords(str: string): string {
  if (!str) return str;
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}
