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
   * Show loading spinner
   */
  isLoading: false,


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
          'created On': collection.publish_date,
          'modeified On': collection.modeified_date ? collection.modeified_date : null,
          modified_by: collection.modified_by
        },

        educational: {
          language: collection.info ? collection.info.language : null,
          'edicational use':collection.metadata ?  collection.metadata.educational_use : null,
          accessbility: collection.accessibility,
          grade: collection.metadata ? collection.metadata.grade[0] : null,
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
      isEnabled: false
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
      controller.set('isLoading', true);
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
              controller.set('isLoading', false);
              return Ember.RSVP.resolve(collection);
            });
        });
    }
  },


  // -------------------------------------------------------------------------
  // Methods

  onChangeSearchTerm: Ember.observer('term', function() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let filters = {
      'flt.publishStatus': 'published'
    };
    Ember.RSVP.hash({
      questions: controller.get('searchService').searchQuestions(term, filters)
    }).then(({
      questions
    }) => {
      controller.set('questions', questions.get('searchResults'));
      controller.set('hitCount', questions.get('hitCount'));
    });
  })

});
