/**
 * Find the route path last occurrence
 * @return {String}
 */
export function getRoutePathLastOccurrence() {
  let currentLocationPath = window.location.href;
  return currentLocationPath.substr(currentLocationPath.lastIndexOf('/') + 1);
}
