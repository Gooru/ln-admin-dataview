/**
 * Find the route path last occurrence
 * @return {String}
 */
export function getRoutePathLastOccurrence() {
  let currentLocationPath = window.location.href;
  return currentLocationPath.substr(currentLocationPath.lastIndexOf('/') + 1);
}

/**
* Get selected node information
* @return {json}
*/
export function getNodeInfo(node) {
  switch (node.depth) {
  case 1:
    return {
      type: 'subject',
      parent: node.data.name
    };
  case 2:
    return {
      type: 'course',
      parent: node.parent.data.name
    };
  case 3:
    return {
      type: 'domain',
      parent: `${node.parent.parent.data.name} > ${node.parent.data.name}`
    };
  case 4:
    return {
      type: 'standard',
      parent: null
    };
  default:
    return null;
  }
}
