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

  /**
   * Inject activity/collections controller
   */
  collectionsController: Ember.inject.controller('activity/collections'),

  /**
   * Inject activity/assessments controller
   */
  assessmentsController: Ember.inject.controller('activity/assessments'),

  /**
   * Inject activity/resources controller
   */
  resourcesController: Ember.inject.controller('activity/resources'),

  /**
   * Inject activity/questions controller
   */
  questionsController: Ember.inject.controller('activity/questions'),

  /**
   * Inject activity/summary controller
   */
  summaryController: Ember.inject.controller('activity/summary'),

  /**
   * Inject activity/courses controller
   */
  coursesController: Ember.inject.controller('activity/courses'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onMenuItemSelection(item) {
      let term = this.get('searchTerm');
      if (term) {
        this.transitionToRoute(`/activities/${item}?term=${term}`);
      } else {
        this.transitionToRoute(`/activities/${item}`);
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
      let searchTerm = term ? `?term=${term}` : `?term=${term}`;
      if (activeMenuIndex > -1) {
        this.transitionToRoute(`/activities/${routeName}${searchTerm}`);
      } else {
        this.transitionToRoute(`/activities/courses${searchTerm}`);
      }
    },

    onChangeFilterItems: function(filterItems, updatedFilter) {
      let controller = this;
      if (updatedFilter) {
        let filterType = updatedFilter.type;
        let filterId = updatedFilter.id;
        filterId =
          typeof filterId === 'string'
            ? filterId.replace(/\./g, '-')
            : filterId;
        let isChecked = Ember.$(
          `.${filterType} .body .filter-name .${filterId} input`
        ).prop('checked');
        Ember.$(`.${filterType} .body .filter-name .${filterId} input`).prop(
          'checked',
          !isChecked
        );
      }
      controller.set('selectedFilterItemsBuffer', filterItems);
      controller.set('selectedFilterItems', filterItems);
      let routeName = Utils.getRoutePathLastOccurrence();
      let activeMenuIndex = ACTIVITIES_NAVIGATION_MENUS_INDEX[routeName];
      if (activeMenuIndex > -1) {
        controller.get(`${routeName}Controller`).refreshItems();
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
    return controller.getStoredFilterItems();
  }),

  /**
   * Search term
   * @type {String}
   */
  searchTerm: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function getStoredFilterItems
   * Function to get locally stored filter items
   */
  getStoredFilterItems() {
    let controller = this;
    let userId = controller.get('session.id');
    let storedFilters =
      JSON.parse(
        localStorage.getItem(`research_${userId}_activities_filters`)
      ) || [];
    return storedFilters;
  },

  /**
   * @function getAppliedFilters
   * Return list of search filters
   */
  getAppliedFilters() {
    let controller = this;
    let appliedFilters = controller.getStoredFilterItems();
    let filterTypes = controller.get('filterTypes');
    let formattedFilters = {};
    if (appliedFilters) {
      filterTypes.map(filterTypeInfo => {
        let filterType = filterTypeInfo.code;
        let categorizedFilter = appliedFilters[`${filterType}`] || null;
        if (categorizedFilter) {
          formattedFilters = Object.assign(
            formattedFilters,
            controller.getFormattedSearchFilters(filterType, categorizedFilter)
          );
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
    case 'category':
      formattedFilters['flt.subjectClassification'] = categorizedFilterData[0]
        ? categorizedFilterData[0].id
        : '';
      break;
    case 'subject':
      categorizedFilterData.map(filterData => {
        formattedFilters[
          'flt.subjectName'
        ] = Utils.getSearchFilterTextBySubjectName(filterData.label);
      });
      break;
    case 'course':
      delimiter = '~~';
      formattedFilters[
        'flt.courseName'
      ] = controller.getConcatenatedFilterString(
        categorizedFilterData,
        delimiter
      );
      break;
    case 'audience':
      formattedFilters[
        'flt.audience'
      ] = controller.getConcatenatedFilterString(categorizedFilterData);
      break;
    case '21-century-skills':
      delimiter = '~~';
      formattedFilters[
        'flt.21CenturySkills'
      ] = controller.getConcatenatedFilterString(
        categorizedFilterData,
        delimiter
      );
      break;
    case 'licenses':
      delimiter = '~~';
      formattedFilters[
        'flt.licenseName'
      ] = controller.getConcatenatedFilterString(
        categorizedFilterData,
        delimiter
      );
      break;
    case 'dok':
      formattedFilters[
        'flt.depthOfKnowledge'
      ] = controller.getConcatenatedFilterString(categorizedFilterData);
      break;
    case 'publisher':
      delimiter = '~~';
      formattedFilters[
        'flt.publisher'
      ] = controller.getConcatenatedFilterString(
        categorizedFilterData,
        delimiter
      );
      break;
    }
    return formattedFilters;
  },

  /**
   * @function getConcatenatedFilterString
   * Return search filter values
   */
  getConcatenatedFilterString(filterInfo, delimiter = ',', keyName = 'label') {
    let label = '';
    if (Ember.isArray(filterInfo)) {
      filterInfo.map(filterData => {
        label += delimiter + filterData[`${keyName}`];
      });
      let numOfCharsRemove = delimiter === ',' ? 1 : 2;
      return label.substring(numOfCharsRemove);
    }
    return label;
  }
});
