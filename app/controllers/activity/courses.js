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
   * @property {Boolean}
   * Show/Hide show more button
   */
  isShowMoreVisible: Ember.computed('courses', function() {
    let controller = this;
    let offset = controller.get('OFFSET');
    let courses = controller.get('courses');
    return (courses.length >= offset);
  }),

  // -------------------------------------------------------------------------
  // Methods

  onChangeSearchTerm: Ember.observer('term', function() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('OFFSET', 1);
    controller.set('courses', Ember.A());
    controller.fetchSearchCourses();
  }),

  /**
   * @function fetchSearchCourses
   * Fetch courses by appliying search filters
   */
  fetchSearchCourses() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let filters = {'flt.publishStatus': 'published'};
    let pageSize = controller.get('PAGE_SIZE');
    let offset = controller.get('OFFSET');
    let appliedFilters = controller.get('activityController').getAppliedFilters();
    let courseFilters = Object.assign(filters, appliedFilters);
    Ember.RSVP.hash({
      courses: controller.get('searchService').searchCourses(term, courseFilters, offset, pageSize)
    }).then(({courses}) => {
      let fetchedCourses = controller.get('courses');
      controller.set('courses', fetchedCourses.concat(courses.get('searchResults')));
      controller.set('OFFSET', offset + pageSize);
      controller.set('hitCount', courses.get('hitCount'));
      controller.set('isLoading', false);
    });
  }
});
