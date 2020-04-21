import Ember from 'ember';
import { accessList } from 'admin-dataview/utils/utils';

/**
 * Checking Permission
 */
export function hasAccess(value) {
  const isMenuAccess = value[0] === 'menu';
  const isLandingPage = value[0] === 'landingPage';
  const userRole = accessList();
  if (isMenuAccess) {
    return userRole.menus.indexOf(value[1]) !== -1;
  } else if (isLandingPage) {
    return userRole.landingPage;
  }
  return userRole.pages[value[0]]
    ? userRole.pages[value[0]].indexOf(value[1]) !== -1 ||
        userRole.pages[value[0]].indexOf('all') !== -1
    : false;
}

export default Ember.Helper.helper(hasAccess);
