/**
 * Rounds a float number and fixes the decimals to a specified number of digits.
 * @param n
 * @param decimals by default is 0
 * @returns {Number}
 */
export function roundFloat(n, decimals = 0) {
  const rounded = (Math.round(n * 10) / 10).toFixed(decimals);
  return parseFloat(rounded);
}

/**
 * Determines if a parameter is of type numeric
 * @see http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
 * @param n
 * @returns {bool}
 */
export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
