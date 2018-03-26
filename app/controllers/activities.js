import Ember from 'ember';
import {
  ACTIVITIES_FILTER,
  ACTIVITIES_NAVIGATION_MENUS_INDEX
} from 'admin-dataview/config/config';
import Utils from 'admin-dataview/utils/utils';

export default Ember.Controller.extend({
  activityController: Ember.inject.controller('activity'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Search term clear refresh
   * @type {String}
   */
  clearSearch: false,

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * @function onSearch
     * Action triggered when the user hit enter on the search box
     */
    onSearch: function(term) {
      let controller = this;
      controller.transitionToRoute(`/activities/summary?term=${term}`);
    },

    onChangeFilterItems(selectedFilterItems) {
      let controller = this;
      controller.set('selectedFilterItems', selectedFilterItems);
      controller.set('appliedFilterList', controller.getUserAppliedFilters());
    },

    clearFilter: function() {
      let controller = this;
      let userId = controller.get('session.id');
      localStorage.setItem(
        `research_${userId}_activities_filters`,
        JSON.stringify({})
      );
      controller.set('selectedFilterItemsBuffer', {});
      let routeName = Utils.getRoutePathLastOccurrence();
      let activeMenuIndex = ACTIVITIES_NAVIGATION_MENUS_INDEX[routeName];
      controller.set('selectedFilterItems', {});
      controller.set('clearSearch', true);
      if (activeMenuIndex > -1) {
        controller.get(`${routeName}Controller`).refreshItems();
      }
    },

    clearSearchText: function() {
      let controller = this;
      let userId = controller.get('session.id');
      let filters = JSON.parse(
        localStorage.getItem(`research_${userId}_activities_filters`)
      );
      if (filters && (filters.category || filters.subject || filters.course)) {
        let url = window.location.href;
        let urlsplitted = url.split('?')[0];
        if (urlsplitted) {
          let lastURLdata = urlsplitted.split('/');
          let colelctionURL = lastURLdata[lastURLdata.length - 1];
          controller.set('searchTerm', '');
          controller.transitionToRoute(`/activities/${colelctionURL}`);
        } else {
          controller.transitionToRoute('/activities');
        }
      } else {
        controller.transitionToRoute('/activities');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array}
   * List of filter items supported in the activities modules
   */
  filterTypes: ACTIVITIES_FILTER,

  getUserAppliedFilters() {
    let controller = this;
    return controller.get('activityController').getAppliedFilters();
  }
});
