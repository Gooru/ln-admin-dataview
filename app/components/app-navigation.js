import Ember from 'ember';
import ConfigurationMixin from 'admin-dataview/mixins/configuration';
import {NAVIGATION_MENUS} from 'admin-dataview/config/config';

/**
 * RGO navigation Tabs
 *
 * Component responsible for enabling more flexible navigation options for RGO.
 * For example, where {@link controllers/application.js} allows access the RGO information and navigate through the menu options.
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

  classNames: ['app-navigation'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      if (this.get('onItemSelected')) {
        this.selectItem(item);
        this.sendAction('onItemSelected', item);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get('selectedMenuItem');
    this.selectItem(item);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('selectedMenuItem', null);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String|Function} onItemSelected - event handler for when an menu item is selected
   */
  onItemSelected: null,

  /**
   * @property {String} selectedMenuItem - menu Item selected
   */
  selectedMenuItem: null,

  /**
   * Navigation menu items
   * @property {Array}
   */
  menuItems: NAVIGATION_MENUS,

  /**
  * Find the active menu index from the navigation list.
  * @property {Boolean}
  */
  activeMenuIndex: Ember.computed(function() {
    return 1;
  }),

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Refreshes the left navigation with the selected menu item
   */
  refreshSelectedMenuItem: function() {
    var item = this.get('selectedMenuItem');
    this.selectItem(item);
  }.observes('selectedMenuItem'),

  // -------------------------------------------------------------------------

  // Methods
  /**
   * Triggered when a menu item is selected. Set the class icon for the item selected showing in the mobiles dropdown menu.
   * @param {string} item
   */
  selectItem: function(item) {
    if (item) {
      var itemElement = `.${item}`;
      this.$('.tab').removeClass('active');
      this.$(itemElement).addClass('active');
    }
  }
});
