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

/**
 * Format a certain number of milliseconds to a string of the form
 * '<hours>h <min>m or <min>m <sec>s'. If the value is falsey, a string
 * with the value '--' is returned
 * @param timeInMillis - time value in milliseconds
 * @returns {String}
 */
export function formatTime(timeInMillis) {
  var result = '';
  var secs;

  if (timeInMillis) {
    secs = timeInMillis / 1000;
    const hours = secs / 3600;
    secs = secs % 3600;
    const mins = secs / 60;
    secs = secs % 60;

    if (hours >= 1) {
      result = `${Math.floor(hours)}h `;
      if (mins >= 1) {
        result += `${Math.floor(mins)}m`;
      }
    } else {
      if (mins >= 1) {
        result = `${Math.floor(mins)}m `;
      }
      if (secs >= 1) {
        result += `${Math.floor(secs)}s`;
      }
    }
  } else {
    result = '';
  }

  return result;
}

/**
 * Around value of count format
 * @param  {Number} count
 * @return {String} formated string of count
 */
export function dataCountFormat(count) {
  return Math.abs(Number(count)) >= 1.0e+9 ?
    `${Math.round(Math.abs(Number(count)) / 1.0e+9)  }B` :
    Math.round(Math.abs(Number(count)) >= 1.0e+6) ?
      `${Math.round(Math.abs(Number(count)) / 1.0e+6)  }M` :
      Math.round(Math.abs(Number(count)) >= 1.0e+3) ?
        `${Math.round(Math.abs(Number(count)) / 1.0e+3)  }K` :
        Math.round(count);
}
