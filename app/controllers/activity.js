import Ember from 'ember';
import {ACTIVITY_FILTER} from 'admin-dataview/config/config';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),


  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onMenuItemSelection(item) {
      let routeTo = `activity.${  item}`;
      this.transitionToRoute(routeTo);
    },

    /**
     * @function onSearchTerm
     * Action triggered when the user hit ente on the search box
     */
    onSearchTerm: function() {
      // TODO action handler
    },

    onChangeFilterItems: function(filterItems) {
      let component = this;
      component.set('selectedFilterItemsBuffer', filterItems);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array}
   * List of filter types
   */
  filterTypes: ACTIVITY_FILTER,

  /**
    * @property {JSON}
    * List of user selected filter items buffer
    */
  selectedFilterItemsBuffer: [],

  /**
   * @property {Array}
   * List of user selected filter items
   */
  selectedFilterItems: Ember.computed('selectedFilterItemsBuffer', function() {
    let controller = this;
    let userId = controller.get('session.id');
    let storedFilters = JSON.parse(localStorage.getItem(`research_${userId}_activities_filters`)) || [];
    return storedFilters;
  })

});
