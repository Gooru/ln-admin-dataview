import Ember from 'ember';
import contentAdapter from 'admin-dataview/adapters/content/content';
import contentSerializer from 'admin-dataview/serializers/content/content';
/**
 * Service for the contents
 *
 * @typedef {Object} contentService
 */
export default Ember.Service.extend({

  learnersAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set('contentAdapter', contentAdapter.create(Ember.getOwner(this).ownerInjection()));
    this.set('contentSerializer', contentSerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Fetch the content resource info by id
   * @returns {Object}
   */
  getContentResourceById: function(resourceId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('contentAdapter')
        .getContentResourceById(resourceId)
        .then(function(response) {
          resolve(service.get('contentSerializer').normalizeContentResourceById(response));
        }, reject);
    });
  },

  /**
   * Fetch the collection content info by id
   * @returns {Object}
   */
  getCollectionById: function(collectionId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('contentAdapter')
        .getCollectionById(collectionId)
        .then(function(response) {
          resolve(service.get('contentSerializer').normalizeCollectionContent(response));
        }, reject);
    });
  }


});
