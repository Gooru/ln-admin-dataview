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
   * @property {Boolean}
   * Show/Hide show more button
   */
  isShowMoreVisible: Ember.computed('assessments', function() {
    let controller = this;
    let offset = controller.get('OFFSET');
    let assessments = controller.get('assessments');
    return (assessments.length >= offset);
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
    let filters = {'flt.publishStatus': 'published'};
    let pageSize = controller.get('PAGE_SIZE');
    let offset = controller.get('OFFSET');
    let appliedFilters = controller.get('activityController').getAppliedFilters();
    let assessmentFilters = Object.assign(filters, appliedFilters);
    Ember.RSVP.hash({
      assessments: controller.get('searchService').searchAssessments(term, assessmentFilters, offset, pageSize)
    }).then(({assessments}) => {
      let fetchedAssessments = controller.get('assessments');
      controller.set('assessments', fetchedAssessments.concat(assessments.get('searchResults')));
      controller.set('OFFSET', offset + pageSize);
      controller.set('hitCount', assessments.get('hitCount'));
      controller.set('isLoading', false);
    });
  }


});
