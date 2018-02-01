import Ember from 'ember';

/**
 * Adapter to support the content get  API's
 *
 * @typedef {Object} LookupAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespaceResource: '/api/nucleus/v1',


  /**
   * Reads a resource by id
   *
   * @param {string} resourceId
   * @returns {Promise}
   */
  getContentResourceById: function(resourceId) {
    const adapter = this;
    const namespace = adapter.get('namespaceResource');
    const resource = 'resources';
    const url = `${namespace}/${resource}/${resourceId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.RSVP.hashSettled({
      locationBasedCount: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.locationBasedCount.value;
    });
  },


  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
