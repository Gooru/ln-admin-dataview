/**
 * Find the route path last occurrence
 * @return {String}
 */
export function getRoutePathLastOccurrence() {
  let currentLocationPath = window.location.href;
  return currentLocationPath.substr(currentLocationPath.lastIndexOf('/') + 1);
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
