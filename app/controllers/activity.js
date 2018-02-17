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

  term: '',


  // -------------------------------------------------------------------------
  // Events

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
      let term =  controller.get('term');
      this.set('searchTerm', term);
      let routeName = Utils.getRoutePathLastOccurrence();
      let activeMenuIndex = ACTIVITIES_NAVIGATION_MENUS_INDEX[routeName];
      if (activeMenuIndex > -1) {
        this.transitionToRoute(`/activities/${  routeName  }`);
      } else {
        this.transitionToRoute('/activities/courses');
      }
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
  searchTerm: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function getAppliedFilters
   * Return list of search filters
   */
  getAppliedFilters() {
    let controller = this;
    let userId = controller.get('session.id');
    let appliedFilters = JSON.parse(localStorage.getItem(`research_${userId}_activities_filters`));
    let filterTypes = controller.get('filterTypes');
    let formattedFilters = {};
    if (appliedFilters) {
      filterTypes.map( filterTypeInfo => {
        let filterType = filterTypeInfo.code;
        let categorizedFilter = appliedFilters[`${filterType}`] || null;
        if (categorizedFilter) {
          formattedFilters = Object.assign(formattedFilters, controller.getFormattedSearchFilters(filterType, categorizedFilter));
        }
      });
    }
    return formattedFilters;
  },

  /**
   * @function getFormattedSearchFilters
   * Return formatted search filters
   */
  getFormattedSearchFilters(filterType, categorizedFilterData) {
    let controller = this;
    let formattedFilters = {};
    let delimiter = ',';
    switch (filterType) {
    case 'subject':
      categorizedFilterData.map( filterData => {
        formattedFilters['flt.subjectName'] = filterData.label;
      });
      break;
    case 'course':
      delimiter = '~~';
      formattedFilters['flt.courseName'] = controller.getConcatenatedFilterString(categorizedFilterData, delimiter);
      break;
    case 'audience':
      formattedFilters['flt.audience'] = controller.getConcatenatedFilterString(categorizedFilterData);
      break;
    case '21-century-skills':
      delimiter = '~~';
      formattedFilters['flt.21CenturySkills'] = controller.getConcatenatedFilterString(categorizedFilterData, delimiter);
      break;
    case 'licenses':
      delimiter = ',';
      formattedFilters['flt.licenseCode'] = controller.getConcatenatedFilterString(categorizedFilterData, delimiter, 'id');
      break;
    case 'dok':
      formattedFilters['flt.dok'] = controller.getConcatenatedFilterString(categorizedFilterData);
      break;
    case 'publisher':
      delimiter = '~~';
      formattedFilters['flt.publisher'] = controller.getConcatenatedFilterString(categorizedFilterData, delimiter);
      break;
    }
    return formattedFilters;
  },

  /**
   * @function getConcatenatedFilterString
   * Return search filter values
   */
  getConcatenatedFilterString( filterInfo, delimiter = ',', keyName = 'label' ) {
    let label = '';
    if (Ember.isArray(filterInfo)) {
      filterInfo.map( filterData => {
        label += delimiter + filterData[`${keyName}`] ;
      });
      let numOfCharsRemove = delimiter === ',' ? 1 : 2;
      return label.substring(numOfCharsRemove);
    }
    return label;
  }

});
