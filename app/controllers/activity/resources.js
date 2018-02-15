import Ember from 'ember';

export default Ember.Controller.extend({

  //------------------------------------------------------------------------
  //Dependencies


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
   * Grouping the data to show more info  in pull out
   */
  groupData: Ember.computed('collection', function() {
    let collection = this.get('collection');
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
          language: collection.info.language,
          'edicational use': collection.metadata.educational_use,
          accessbility: collection.accessibility,
          grade: collection.metadata.grade[0],
          'age-range': null,
          'Editorial Range': null,
          signature: collection.signature ? collection.signature : null,
          keywords: collection.info.keywords ? collection.info.keywords[0] : null,
          audience: collection.metadata.audience
        },


        media: {
          format: collection.content_subformat,
          'media Fearures': collection.media ? collection.media : null,
          'access hazard': collection.accesshazard ? collection.accesshazard : null,
          advertisement_level: collection.metadata.advertisement_level,
          framebreaker: collection.display_guide.is_frame_breaker,
          isBroken: collection.publish_date.is_broken,
          address: collection.address ? collection.address : null
        },


        instructional: {
          depthofknowledge: collection.depthofknowledge,
          '21st Century Skills': collection.skills
        },

        framework: {
          subject: collection.info.crawled_subject,
          course: collection.info.gooru_course ? collection.info.gooru_course[0] : null,
          domain: collection.info.domain.attribution,
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


  // /**
  //  * Grouping header data to show more info  in pull out
  //  */
  groupHeader: Ember.computed('groupData', function() {
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
    getResourceInfo: function(resource) {
      console.log('resource:::::::::::::::::::::::::::::', resource);
      let controller = this;
      controller.set('isLoading', true);
      controller.set('showPullOut', true);
      controller.set('showMore', true);
      let collectionType = 'resource';
      return controller.get('contentService').getContentResourceById(resource.id)
        .then(function(collection) {
          return controller.get('profileService').readUserProfile(collection.creator_id)
            .then(function(owner) {
              collection.set('owner', owner);
              controller.set('collection', collection);
              controller.set('collection.type', collectionType);
              controller.set('isLoading', false);
              return Ember.RSVP.resolve(collection);
            });
        });
    }
  }
});
