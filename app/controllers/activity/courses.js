import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Query

  queryParams: ['term'],


  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @requires controller:activity
   */
  activityController: Ember.inject.controller('activity'),

  //-------------------------------------------------------------------------
  //Actions

  actions: {
    showMoreResults: function() {
      let controller = this;
      controller.fetchSearchCourses();
    }
  },

  //-------------------------------------------------------------------------
  //Properties

  /**
   * It maintains the list of course data
   * @type {Array}
   */
  courses: Ember.A(),

  /**
   * It maintains the search total hitcount
   * @type {Number}
   */
  hitCount: 0,

  /**
   * @property {Number}
   * Defines how many results should fetch
   */
  PAGE_SIZE: 8,

  /**
   * @property {Number}
   * Maintain current offset of the search API
   */
  OFFSET: 1,

  /**
   * @property {Boolean}
   * Toggle show/hide view of three bounce spinner
   */
  isLoading: false,

  /**
   * @property {Number}
   * Holds currently fetched results count
   */
  CUR_ITERATION_COUNT: 0,

  /**
   * @property {Boolean}
   * Show/Hide show more button
   */
  isShowMoreVisible: Ember.computed('courses', function() {
    let controller = this;
    let CUR_ITERATION_COUNT = controller.get('CUR_ITERATION_COUNT');
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    return (PAGE_SIZE <= CUR_ITERATION_COUNT);
  }),

  // -------------------------------------------------------------------------
  // Methods

  onChangeSearchTerm: Ember.observer('term', function() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('courses', Ember.A());
    controller.set('OFFSET', 1);
    controller.fetchSearchCourses();
  }),

  /**
   * @function fetchSearchCourses
   * Fetch courses by appliying search filters
   */
  fetchSearchCourses() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    let OFFSET = controller.get('OFFSET');
    let courseFilters = controller.get('activityController').getAppliedFilters();
    Ember.RSVP.hash({
      courses: controller.get('searchService').searchCourses(term, courseFilters, OFFSET, PAGE_SIZE)
    }).then(({courses}) => {
      let fetchedCourses = controller.get('courses');
      let CUR_ITERATION_COUNT = courses.get('searchResults').length;
      controller.set('courses', fetchedCourses.concat(courses.get('searchResults')));
      controller.set('CUR_ITERATION_COUNT', CUR_ITERATION_COUNT);
      controller.set('OFFSET', OFFSET + CUR_ITERATION_COUNT);
      controller.set('hitCount', courses.get('hitCount'));
      controller.set('isLoading', false);
    });
  }
});
