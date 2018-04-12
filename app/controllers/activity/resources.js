import Ember from 'ember';
import { truncateString } from 'admin-dataview/utils/utils';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Query

  queryParams: ['term'],

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
   * It maintains the list of resources data
   * @type {Array}
   */
  resources: Ember.A(),

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
  isShowMoreVisible: Ember.computed('resources', function() {
    let controller = this;
    let CUR_ITERATION_COUNT = controller.get('CUR_ITERATION_COUNT');
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    return PAGE_SIZE <= CUR_ITERATION_COUNT;
  }),

  /**
   * @property {Object}
   *  usage statistics
   */
  usageStatistics: Ember.computed(function() {
    let usageStatistics = [
      {
        total: 600000,
        name: 'average time spent'
      },
      {
        total: 1300000,
        name: 'view count'
      },
      {
        total: 4000000,
        name: 'remixed count'
      },
      {
        total: 5000,
        name: 'times studied'
      }
    ];

    return usageStatistics;
  }),

  /**
   * @property {Object}
   *  audience level of  text
   */
  audienceLevelText: [
    '',
    '',
    '',
    'All Students',
    'English Language Learners',
    'Students Above Grade Level',
    'Students Below Grade Level',
    'Students With Special Needs',
    'Teachers'
  ],

  /**
   * Grouping the data to show more info  in pull out
   */
  groupData: Ember.computed('collection', function() {
    let controller = this;
    let collection = this.get('collection');
    let audienceLevel = controller.get('audienceLevelText');
    let resultSet = Ember.A();
    let selectedResource = controller.get('selectedResource');
    let taxonomyCourses = '';
    let taxonomyDomains = '';
    if (selectedResource && selectedResource.taxonomyCourse) {
      let i = 0;
      selectedResource.taxonomyCourse.forEach(data => {
        i = i + 1;
        if (selectedResource.taxonomyCourse.length > i) {
          taxonomyCourses += ` ${data},`;
        } else {
          taxonomyCourses += ` ${data}`;
        }
      });
      if (selectedResource.taxonomyDomain) {
        selectedResource.taxonomyDomain.forEach(data => {
          i = i + 1;
          if (selectedResource.taxonomyDomain.length > i) {
            taxonomyDomains += ` ${data},`;
          } else {
            taxonomyDomains += ` ${data}`;
          }
        });
      }
    }

    if (collection) {
      resultSet = {
        descriptive: {
          title: collection.title,
          description: truncateString(collection.description)
        },

        creation: {
          'Published By': 'Gooru org',
          'Published Status': 'Published',
          Aggregator: collection.aggregator ? collection.aggregator : null,
          License: collection.license ? collection.license : null,
          'creator Name': collection.owner.username,
          'created On': collection.publish_date
            ? moment(collection.publish_date).format('YYYY-MM-DD')
            : null,
          'modeified On': collection.modeified_date
            ? collection.modeified_date
            : null,
          modified_by: collection.modified_by
        },

        educational: {
          language: collection.info
            ? collection.info.language === 'eng'
              ? 'English'
              : collection.info.language
            : 'English',
          'edicational use': collection.metadata
            ? collection.metadata.educational_use
            : null,
          accessbility: collection.accessibility,
          grade: collection.metadata ? collection.metadata.grade[0] : null,
          'age-range': null,
          'Editorial Range': null,
          signature: collection.signature ? collection.signature : null,
          keywords: collection.info.keywords
            ? collection.info.keywords[0]
            : null,
          audience: collection.metadata.audience
            ? audienceLevel[collection.metadata.audience]
            : null
        },

        media: {
          format: collection.content_subformat
            ? collection.content_subformat.replace(/_/g, ' ')
            : null,
          'media Fearures': collection.media ? collection.media : null,
          'access hazard': collection.accesshazard
            ? collection.accesshazard
            : 'None',
          advertisement_level: collection.metadata
            ? collection.metadata.advertisement_level
              ? collection.metadata.advertisement_level
              : 'Low'
            : 'Low',
          framebreaker: collection.display_guide.is_frame_breaker
            ? collection.display_guide.is_frame_breaker
            : 'No',
          isBroken: collection.publish_date.is_broken
            ? collection.publish_date.is_broken
            : 'No',
          address: collection.address ? collection.address : 'None'
        },

        instructional: {
          'Depth of Knowledge': collection.depthofknowledge,
          '21st Century Skills': collection.skills
        },

        framework: {
          subject: selectedResource.taxonomySubject,
          course: taxonomyCourses,
          domain: taxonomyDomains,
          standard: collection.taxonomy ? collection.taxonomy.id : null
        },

        vector: {
          relevance: 0.5,
          engagment: 0.5,
          efficacy: 0.5
        }
      };
    }
    return resultSet;
  }),

  /**
   * Grouping header data to show more info  in pull out
   */
  groupHeader: Ember.computed('groupData', function() {
    let resultHeader = Ember.A();
    resultHeader = [
      Ember.Object.create({
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
    getResourceInfo: function(resource) {
      let controller = this;
      controller.set('isLoadingPullOut', true);
      controller.set('showPullOut', true);
      controller.set('showMore', true);
      controller.set('selectedResource', resource);
      let collectionType = 'resource';
      return controller
        .get('contentService')
        .getResourceById(resource.id)
        .then(function(collection) {
          return controller
            .get('profileService')
            .readUserProfile(collection.creator_id)
            .then(function(owner) {
              collection.set('owner', owner);
              controller.set('collection', collection);
              controller.set('collection.type', collectionType);
              controller.set('isLoadingPullOut', false);
              return Ember.RSVP.resolve(collection);
            });
        });
    },

    /**
     * @function showMoreResults
     * Action triggered when the user click on the more results button
     */
    showMoreResults: function() {
      let controller = this;
      controller.fetchSearchResources();
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
    let term = controller.get('term');
    if (term) {
      controller.refreshItems();
    }
  }),

  /**
   * @function refreshItems
   * Method to refresh search items
   */
  refreshItems() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('OFFSET', 1);
    controller.set('resources', Ember.A());
    controller.fetchSearchResources();
  },

  /**
   * @function fetchSearchResources
   * Fetch courses by appliying search filters
   */
  fetchSearchResources() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    let OFFSET = controller.get('OFFSET');
    let resourceFilters = controller
      .get('activityController')
      .getAppliedFilters();
    Ember.RSVP.hash({
      resources: controller
        .get('searchService')
        .searchResources(term, resourceFilters, OFFSET, PAGE_SIZE)
    }).then(({ resources }) => {
      let fetchedResources = controller.get('resources');
      let CUR_ITERATION_COUNT = resources.get('searchResults').length;
      controller.set(
        'resources',
        fetchedResources.concat(resources.get('searchResults'))
      );
      controller.set('CUR_ITERATION_COUNT', CUR_ITERATION_COUNT);
      controller.set('OFFSET', OFFSET + CUR_ITERATION_COUNT);
      controller.set('hitCount', resources.get('hitCount'));
      controller.set('isLoading', false);
    });
  }
});
