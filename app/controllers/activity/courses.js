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
   * @requires service:content
   */
  contentService: Ember.inject.service('api-sdk/content'),
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
    },

    onPlayCourse: function(course) {
      let controller = this;
      controller.set('selectedCourse', course);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this.set('isLoading', true);
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
  PAGE_SIZE: 9,

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

  /**
   * @property {Array}
   * Selectee course data
   */
  selectedCourse: null,

  /**
   * Grouping the data to show more info  in pull out
   */
  groupData: Ember.computed('selectedCourse', function() {
    let course = this.get('selectedCourse');
    let resultSet = Ember.A();
    if (course) {
      // resultSet = {
      //   descriptive: {
      //     title: course.title,
      //     description: course.description
      //   },
      //
      //   creation: {
      //     'Creator ID': course.creatorId,
      //     'Created On': moment(course.createdDate).format('LLLL') || null,
      //     'Publisher': 'Gooru Org',
      //     'Collaborator': course.collaboratorIDs,
      //     'Instance Creator': course.owner.username,
      //     'Original Creator': course.creator.username,
      //     Aggregator: course.aggregator ? course.aggregator : null,
      //     'Modified On': moment(course.lastModified).format('LLLL') || null,
      //     'Modified by': course.lastModifiedBy,
      //     License: course.license ? course.license.code : null,
      //     'Created': course.owner.username,
      //     'Owner ID': course.owner.id
      //   },
      //
      //   educational: {
      //     'Audience': course.audience,
      //     'Time Required': null,
      //     'Grade Level': course.grade,
      //     'Learning Objective': course.learningObjectives
      //   },
      //
      //   media: {
      //     'Keywords': course.keyPoints,
      //     'Visibility': null
      //   },
      //
      //
      //   instructional: {
      //     'Instructional Model': course.instructionalModel,
      //     '21st Century Skills': course.skills
      //   },
      //
      //   framework: {
      //     subject: course.taxonomySet.subject,
      //     course: course.taxonomySet.course,
      //     domain: course.taxonomySet.domain,
      //     standard: null
      //   },
      //
      //   Internal: {
      //     'ID': course.id,
      //     'Deleted': null,
      //     'Flagged': null
      //   },
      //
      //   vector: {
      //     relevance: course.relevance,
      //     engagment: course.engagment,
      //     efficacy: course.efficacy
      //   }
      // };
    }
    return resultSet;
  }),


  /**
   * Grouping header data to show more info  in pull out
   */
  groupHeader: Ember.computed('groupData', function() {
    let resultHeader = Ember.A();
    resultHeader = [Ember.Object.create({
      header: 'extracted',
      isEnabled: true
    }),
    Ember.Object.create({
      header: 'curated',
      isEnabled: true
    }),
    Ember.Object.create({
      header: 'tagged',
      isEnabled: true
    }),
    Ember.Object.create({
      header: 'computed',
      isEnabled: true
    })
    ];
    return resultHeader;
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
