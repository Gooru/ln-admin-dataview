import Ember from 'ember';

/**
 * Adapter to support the operation for crosswalkAdapter
 *
 * @typedef {Object} crosswalkAdapter
 */

export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/taxonomy/crosswalk',

  /**
   * @param subjectId
   * Method to fetch crosswalk data using JSON file
   */
  getCrosswalkData(frameworkId, subjectId, isIncludeMicro = false) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/frameworks/${frameworkId}/subjects/${subjectId}`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        include_mcomp: isIncludeMicro
      }
    };
    return Ember.RSVP.hashSettled({
      crosswalkData: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.crosswalkData.value;
    });
  },

  defineHeaders() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }
});
