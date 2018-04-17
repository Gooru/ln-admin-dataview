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
  OFFSET: 0,

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
   *  collections data to pull out
   */
  collection: null,

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
   * Grouping the data to show more info  in pull out
   */
  groupData: Ember.computed('collection', function() {
    let controller = this;
    let collection = this.get('collection');
    let resultSet = Ember.A();
    let selectedResource = controller.get('selectedResource');
    if (collection) {
      let metadataLevels = controller.get('metadataLevels');
      let advertisement_level = metadataLevels.advertisement_level;
      let audience = metadataLevels.audience;
      let grade = metadataLevels.grade;
      let License = metadataLevels.license;
      let educational_use = metadataLevels.educational_use;
      let gradeLevelText = [];
      let collectionGrade = collection.metadata
        ? collection.metadata.grade
        : null;
      if (collectionGrade) {
        collectionGrade.forEach(gradeLevel => {
          gradeLevelText.push(grade[gradeLevel]);
        });
      }

      resultSet = {
        descriptive: {
          title: collection.title,
          description: truncateString(collection.description)
        },

        creation: {
          'Published By': 'Gooru org',
          'Published Status': 'Published',
          License: collection.license
            ? License[collection.license]
            : 'Public Domain',
          'created by': collection.owner.username,
          'created on': collection.publish_date
            ? moment(collection.publish_date).format('YYYY-MM-DD')
            : null,
          'modified on': collection.modeified_date
            ? collection.modeified_date
            : null,
          'modified by': collection.modified_by
        },

        educational: {
          language: collection.info
            ? collection.info.language === 'eng'
              ? 'English'
              : !collection.info.language ? 'English' : collection.info.language
            : 'English',
          'educational use': collection.metadata
            ? educational_use[collection.metadata.educational_use]
            : null,
          accessbility: collection.accessibility,
          grade: collection.metadata
            ? collection.metadata.grade ? gradeLevelText.join(', ') : null
            : null,
          'age-range': null,
          'Editorial Range': null,
          keywords: collection.info
            ? collection.info.keywords ? collection.info.keywords[0] : null
            : null,
          audience: collection.metadata
            ? collection.metadata.audience
              ? audience[collection.metadata.audience]
              : null
            : null
        },

        media: {
          format: collection.content_subformat
            ? collection.content_subformat.replace(/_/g, ' ')
            : null,
          'media Features': collection.media ? collection.media : null,
          'access hazard': collection.accesshazard
            ? collection.accesshazard
            : 'None',
          'advertisement level': collection.metadata
            ? collection.metadata.advertisement_level
              ? advertisement_level[collection.metadata.advertisement_level]
              : 'Low'
            : 'Low',
          framebreaker: collection.display_guide
            ? collection.display_guide.is_frame_breaker === 1 ? 'Yes' : 'No'
            : 'No',
          'Is Broken': collection.publish_date.is_broken
            ? collection.publish_date.is_broken
            : 'No',
          address: collection.url ? collection.url : 'No'
        },

        instructional: {
          'Depth of Knowledge': collection.depthofknowledge,
          '21st Century Skills': collection.skills
        },

        framework: {
          subject: selectedResource.taxonomySubject,
          course: selectedResource.taxonomyCourse
            ? selectedResource.taxonomyCourse.join(', ')
            : null,
          domain: selectedResource.taxonomyDomain
            ? selectedResource.taxonomyDomain.join(', ')
            : null,
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
    let controller = this;
    controller.set('isLoading', true);
    controller
      .get('contentService')
      .getMetadataLevel()
      .then(metadataLevel => {
        controller.set('metadataLevels', metadataLevel);
      });
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
    controller.set('OFFSET', 0);
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
