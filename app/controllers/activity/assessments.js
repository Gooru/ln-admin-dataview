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
      controller.fetchSearchAssessments();
    }
  },

  //-------------------------------------------------------------------------
  //Properties

  /**
   * It maintains the list of assessment data
   * @type {Array}
   */
  assessments: Ember.A(),

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
  isShowMoreVisible: Ember.computed('assessments', function() {
    let controller = this;
    let CUR_ITERATION_COUNT = controller.get('CUR_ITERATION_COUNT');
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    return (PAGE_SIZE <= CUR_ITERATION_COUNT);
  }),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods

  onChangeSearchTerm: Ember.observer('term', function() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('OFFSET', 1);
    controller.set('assessments', Ember.A());
    controller.fetchSearchAssessments();
  }),

  /**
   * @function fetchSearchCourses
   * Fetch courses by appliying search filters
   */
  fetchSearchAssessments() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    let OFFSET = controller.get('OFFSET');
    let assessmentFilters = controller.get('activityController').getAppliedFilters();
    Ember.RSVP.hash({
      assessments: controller.get('searchService').searchAssessments(term, assessmentFilters, OFFSET, PAGE_SIZE)
    }).then(({assessments}) => {
      let fetchedAssessments = controller.get('assessments');
      let CUR_ITERATION_COUNT = assessments.get('searchResults').length;
      controller.set('assessments', fetchedAssessments.concat(assessments.get('searchResults')));
      controller.set('CUR_ITERATION_COUNT', CUR_ITERATION_COUNT);
      controller.set('OFFSET', OFFSET + CUR_ITERATION_COUNT);
      controller.set('hitCount', assessments.get('hitCount'));
      controller.set('isLoading', false);
    });
  }


});
