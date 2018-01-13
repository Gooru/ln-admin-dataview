import Ember from 'ember';
import ConfigurationMixin from 'admin-dataview/mixins/configuration';
import {LEARNER_NAVIGATION_MENUS,LEARNER_NAVIGATION_MENUS_INDEX} from 'admin-dataview/config/config';
import Utils from 'admin-dataview/utils/utils';

/**
 * RGO navigation Tabs
 *
 * Component responsible for enabling more flexible navigation options for RGO.
 * For example, where {@link controllers/learner.js} allows access the RGO information and navigate through the menu options.
 * @module
 * @see controllers/application.js
 * @augments ember/Component
 */
export default Ember.Component.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['learner-menu-navigation'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    onMenuItemSelection: function(item) {
      this.sendAction('onMenuItemSelection', item);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Navigation menu items
   * @property {Array}
   */
  menuItems: LEARNER_NAVIGATION_MENUS,

  /**
  * Find the active menu index from the navigation list.
  * @property {Boolean}
  */
  activeMenuIndex: Ember.computed(function() {
    let activeMenuIndex = LEARNER_NAVIGATION_MENUS_INDEX[Utils.getRoutePathLastOccurrence()];
    return activeMenuIndex > -1 ? activeMenuIndex : 0;
  })

});
