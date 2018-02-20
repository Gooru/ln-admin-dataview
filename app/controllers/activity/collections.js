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

  contentService: Ember.inject.service('api-sdk/content'),

  /**
   * @requires controller:activity
   */
  activityController: Ember.inject.controller('activity'),

  //-------------------------------------------------------------------------
  //Properties

  /**
   * It maintains the list of collection data
   * @type {Array}
   */
  collections: Ember.A(),

  showPullOut: false,

  selectedCollection: null,

  collectionPullOutData: null,

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
  isShowMoreVisible: Ember.computed('collections', function() {
    let controller = this;
    let CUR_ITERATION_COUNT = controller.get('CUR_ITERATION_COUNT');
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    return (PAGE_SIZE <= CUR_ITERATION_COUNT);
  }),

  // -------------------------------------------------------------------------
  // Events
  init() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('collections', Ember.A());
    controller.set('OFFSET', 1);
    controller.fetchSearchCollections();
  },


  // -------------------------------------------------------------------------
  // Methods

  fetchCollectionPullOutData(collectionId) {
    let controller = this;
    let collectionPromise = Ember.RSVP.resolve(controller.get('contentService').getCollectionById(collectionId));
    return Ember.RSVP.hash({
      collection: collectionPromise
    })
      .then(function(hash) {
        controller.set('collectionPullOutData', hash.collection);
      });
  },

  onChangeSearchTerm: Ember.observer('term', function() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('OFFSET', 1);
    controller.set('collections', Ember.A());
    controller.fetchSearchCollections();
  }),

  fetchSearchCollections() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let PAGE_SIZE = controller.get('PAGE_SIZE');
    let OFFSET = controller.get('OFFSET');
    let collectionFilters = controller.get('activityController').getAppliedFilters();
    Ember.RSVP.hash({
      collections: controller.get('searchService').searchCollections(term, collectionFilters, OFFSET, PAGE_SIZE)
    }).then(({
      collections
    }) => {
      let fetchedCollections = controller.get('collections');
      let CUR_ITERATION_COUNT = collections.get('searchResults').length;
      controller.set('collections', fetchedCollections.concat(collections.get('searchResults')));
      controller.set('CUR_ITERATION_COUNT', CUR_ITERATION_COUNT);
      controller.set('OFFSET', OFFSET + CUR_ITERATION_COUNT);
      controller.set('isLoading', false);
      controller.set('hitCount', collections.get('hitCount'));
    });
  },

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    onPlayCollection(collection) {
      let controller = this;
      controller.fetchCollectionPullOutData(collection.id);
      controller.set('selectedCollection', collection);
      controller.set('showPullOut', true);
    },

    showMoreResults: function() {
      let controller = this;
      controller.fetchSearchCollections();
    }
  }


});
