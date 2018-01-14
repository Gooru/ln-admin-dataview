/**
 * Find the route path last occurrence
 * @return {String}
 */
export function getRoutePathLastOccurrence() {
  let currentLocationPath = window.location.href;
  return currentLocationPath.substr(currentLocationPath.lastIndexOf('/') + 1);
}

/**
 * Find the route path first occurrence
 * @return {String}
 */
export function getRoutePathFirstOccurrence() {
  let currentLocationPath = window.location.pathname;
  return currentLocationPath.split('/')[1];
}

/**
 * Get the resource format to be App compliant
 * @function
 * @param format
 * @returns {string}
 */
export function getResourceFormat(format) {
  return format ? format.split('_')[0] : undefined; // i.e video_resource to video
}

/**
 * Truncate given string into 72 chars
 * @function
 * @param text
 * @returns {string}
 */
export function truncateString(text) {
  if (text.length > 100) {
    return `${text.substring(0, 95)  }...`;
  }
  return text;
}
