import Ember from 'ember';

export default Ember.Controller.extend({

  contentService: Ember.inject.service('api-sdk/content'),

  actions: {
    onPlayCollection(collection) {
      let controller = this;
      controller.fetchCollectionPullOutData(collection.id);
      controller.set('selectedCollection', collection);
      controller.set('showPullOut', true);
    }
  },

  showPullOut: false,

  selectedCollection: null,

  collectionPullOutData: null,

  fetchCollectionPullOutData(collectionId) {
    let controller = this;
    let collectionPromise = Ember.RSVP.resolve(controller.get('contentService').getCollectionById(collectionId));
    return Ember.RSVP.hash({
      collection : collectionPromise
    })
      .then(function(hash) {
        controller.set('collectionPullOutData', hash.collection);
      });
  }


});
