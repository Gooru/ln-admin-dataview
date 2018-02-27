import Ember from 'ember';

/**
 * Adapter to support the content get  API's
 *
 * @typedef {Object} LookupAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1',


  /**
   * Reads a resource by id
   *
   * @param {string} resourceId
   * @returns {Promise}
   */
  getResourceById: function(resourceId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
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

  /**
   * Reads a collection by id
   *
   * @param {string} resourceId
   * @returns {Promise}
   */
  getCollectionById: function(collectionId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const resource = 'collections';
    const url = `${namespace}/${resource}/${collectionId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Reads a assessment by id
   *
   * @param {string} resourceId
   * @returns {Promise}
   */
  getAssessmentById: function(assessmentId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/assessments/${assessmentId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },


  /**
   * Reads a resource by id
   *
   * @param {string} resourceId
   * @returns {Promise}
   */
  getQuestionById: function(questionId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const question = 'questions';
    const url = `${namespace}/${question}/${questionId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
