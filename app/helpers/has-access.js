import Ember from 'ember';

/**
 * Checking Permission
 */
export function hasAccess(value) {
  const isMenuAccess = value[0] === 'menu';
  const userRole = JSON.parse(window.localStorage.MC_APP_USER_ROLE);
  if (isMenuAccess) {
    return userRole.menus.indexOf(value[1]) !== -1;
  }
  return userRole.pages ? userRole.pages.indexOf(value[1]) !== -1 : false;
}

export default Ember.Helper.helper(hasAccess);
