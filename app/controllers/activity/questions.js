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
   * Search service to fetch content details
   */
  contentService: Ember.inject.service('api-sdk/content'),

  /**
   * @requires service:profile
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @requires controller:activity
   */
  activityController: Ember.inject.controller('activity'),

  //-------------------------------------------------------------------------
  //Properties
  /**
   * show pull out .
   * @type {boolean}
   */
  showPullOut: false,

  /**
   * pull out show more options  .
   * @type {boolean}
   */
  showMore: true,

  /**
   * It maintains the list of question data
   * @type {Array}
   */
  questions: Ember.A(),

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
   * @property {Boolean}
   * Toggle show/hide view of three bounce spinner
   */
  isLoadingPullOut: false,

  /**
   * @property {Number}
   * Holds currently fetched results count
   */
  CUR_ITERATION_COUNT: 0,

  /**
   * @property {Boolean}
   * Show/Hide show more button
   */
  isShowMoreVisible: Ember.computed('questions', function() {
    let controller = this;
    let CUR_ITERATION_COUNT = controller.get('CUR_ITERATION_COUNT');
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    return (PAGE_SIZE <= CUR_ITERATION_COUNT);
  }),


  /**
   * Grouping the data to show more info  in pull out
   */
  groupData: Ember.computed('question', function() {
    let collection = this.get('question');
    let resultSet = Ember.A();
    if (collection) {
      resultSet = {
        descriptive: {
          title: collection.title,
          description: collection.description
        },
        creation: {
          'Published By': 'Gooru org',
          'Published Status': 'Published',
          Aggregator: collection.aggregator ? collection.aggregator : null,
          License: collection.license ? collection.license : null,
          'creator Name': collection.owner.username,
          'created On': collection.publish_date ? moment(collection.publish_date).format('YYYY-MM-DD') : null,
          'modeified On': collection.modeified_date ? collection.modeified_date : null,
          modified_by: collection.modified_by
        },

        educational: {
          language: collection.info ? collection.info.language : null,
          'edicational use': collection.metadata ? collection.metadata.educational_use : null,
          accessbility: collection.accessibility,
          grade: collection.metadata ? collection.metadata.grade : null,
          'age-range': collection.age ? collection.age : null,
          'Editorial Range': null,
          signature: collection.signature ? collection.signature : null,
          keywords: collection.info ? collection.info.keywords[0] : null,
          audience: collection.metadata ? collection.metadata.audience : null
        },


        media: {
          format: collection.content_subformat,
          'media Fearures': collection.media ? collection.media : null,
          'access hazard': collection.accesshazard ? collection.accesshazard : null,
          advertisement_level: collection.metadata ? collection.metadata.advertisement_level : null,
          framebreaker: collection.display_guide ? collection.display_guide.is_frame_breaker : null,
          isBroken: collection.publish_date ? collection.publish_date.is_broken : null,
          address: collection.address ? collection.address : null
        },


        instructional: {
          depthofknowledge: collection.depthofknowledge,
          '21st Century Skills': collection.skills
        },

        framework: {
          subject: collection.info ? collection.info.crawled_subject : null,
          course: collection.info ? collection.info.gooru_course[0] : null,
          domain: collection.info ? collection.info.domain.attribution : null,
          standard: collection.taxonomy ? collection.taxonomy.id : null
        },

        vector: {
          relevance: null,
          engagment: null,
          efficacy: null
        }
      };
    }
    return resultSet;
  }),


  /**
   * Grouping header data to show more info  in pull out
   */
  questionHeader: Ember.computed('groupData', function() {
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
  // Actions

  actions: {

    /**
     * Action triggered when the user invoke the collection in pull out.
     */
    getQuestionInfo: function(id) {
      let controller = this;
      controller.set('isLoadingPullOut', true);
      controller.set('showPullOut', true);
      controller.set('showMore', true);
      let collectionType = 'question';
      // f9477835-3f72-41de-8b85-997239ed19f6
      return controller.get('contentService').getQuestionById(id)
        .then(function(collection) {
          return controller.get('profileService').readUserProfile(collection.creator_id)
            .then(function(owner) {
              collection.set('owner', owner);
              controller.set('question', collection);
              controller.set('question.type', collectionType);
              controller.set('isLoadingPullOut', false);
              return Ember.RSVP.resolve(collection);
            });
        });
    },

    /**
     * @function showMoreResults
     * Action triggered when the user click on the show more button
     */
    showMoreResults() {
      let controller = this;
      controller.fetchSearchQuestions();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this.set('isLoading', true);
  },


  // -------------------------------------------------------------------------
  // Methods

  onChangeSearchTerm: Ember.observer('term', function() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('OFFSET', 1);
    controller.set('questions', Ember.A());
    controller.fetchSearchQuestions();
  }),

  /**
   * @function fetchSearchQuestions
   * Fetch courses by appliying search filters
   */
  fetchSearchQuestions() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    let OFFSET = controller.get('OFFSET');
    let questionFilters = controller.get('activityController').getAppliedFilters();
    Ember.RSVP.hash({
      questions: controller.get('searchService').searchQuestions(term, questionFilters, OFFSET, PAGE_SIZE)
    }).then(({
      questions
    }) => {
      let fetchedQuestions = controller.get('questions');
      let CUR_ITERATION_COUNT = questions.get('searchResults').length;
      controller.set('questions', fetchedQuestions.concat(questions.get('searchResults')));
      controller.set('CUR_ITERATION_COUNT', CUR_ITERATION_COUNT);
      controller.set('OFFSET', OFFSET + CUR_ITERATION_COUNT);
      controller.set('hitCount', questions.get('hitCount'));
      controller.set('isLoading', false);
    });
  }

});
