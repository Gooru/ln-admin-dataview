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
    let term = controller.get('term') ? controller.get('term') : '*';
    let filters = {
      'flt.publishStatus': 'published'
    };
    Ember.RSVP.hash({
      collections: controller.get('searchService').searchCollections(term, filters)
    }).then(({
      collections
    }) => {
      controller.set('collections', collections.get('searchResults'));
      controller.set('hitCount', collections.get('hitCount'));
    });
  }),

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    onPlayCollection(collection) {
      let controller = this;
      controller.fetchCollectionPullOutData(collection.id);
      controller.set('selectedCollection', collection);
      controller.set('showPullOut', true);
    }
  }


});
