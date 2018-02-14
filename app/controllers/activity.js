import Ember from 'ember';
import {
  ACTIVITY_FILTER,
  ACTIVITIES_NAVIGATION_MENUS_INDEX
} from 'admin-dataview/config/config';
import Utils from 'admin-dataview/utils/utils';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Query

  queryParams: ['term'],


  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),


  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onMenuItemSelection(item) {
      let term = this.get('searchTerm');
      if (term) {
        this.transitionToRoute(`/activities/${  item  }?term=${  term}`);
      } else {
        this.transitionToRoute(`/activities/${  item}`);
      }
    },

    /**
     * @function onSearch
     * Action triggered when the user hit enter on the search box
     */
    onSearch: function(term) {
      this.set('searchTerm', term);
      let routeName = Utils.getRoutePathLastOccurrence();
      let activeMenuIndex = ACTIVITIES_NAVIGATION_MENUS_INDEX[routeName];
      if (activeMenuIndex > -1) {
        this.transitionToRoute(`/activities/${  routeName  }?term=${  term}`);
      } else {
        this.transitionToRoute(`/activities/courses?term=${  term}`);
      }
    },

    onChangeFilterItems: function(filterItems) {
      let controller = this;
      controller.set('selectedFilterItemsBuffer', filterItems);
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
  }),

  /**
   * Search term
   * @type {String}
   */
  searchTerm: null

});
