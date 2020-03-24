import Ember from 'ember';

/**
 * Adapter to fetch resource related data
 *
 * @typedef {Object} resourceAdapter
 */
export default Ember.Object.extend({
  /**
   * @return {sessionObject} session
   */
  session: Ember.inject.service('session'),

  namespace: '/api/missioncontrol/v1/resource',

  /**
   * @return {Promise} fetch transcript for resources
   */

  fetchTranscript(resourceId) {
    const endpoint = `${this.namespace}/transcripts?resource_ids=${resourceId}`;
    const options = {
      type: 'GET',
      headers: this.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.$.ajax(endpoint, options);
  },

  /**
   * @return {Promise} fetch transcript for resources
   */

  fetchSummary(resourceId) {
    const endpoint = `${this.namespace}/summary?resource_ids=${resourceId}`;
    const options = {
      type: 'GET',
      headers: this.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.$.ajax(endpoint, options);
  },

  defineHeaders() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }
});
