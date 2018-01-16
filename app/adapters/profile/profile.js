import Ember from 'ember';

/**
 * Adapter to support the Profile
 *
 * @typedef {Object} ProfileAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v2/profiles',

  /**
   * Gets the profile information of a given user id
   *
   * @param userId the unique profile user id
   * @returns {Promise}
   */
  readUserProfileByUsername: function(username) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/search?username=${username}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get basic Profile data for a list of profile IDs
   *
   * @param profileIds the list of profile IDs
   * @returns {Promise}
   */
  readMultipleProfiles: function(profileIds) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/search`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        userids: Ember.isArray(profileIds) ? profileIds.join() : null
      }
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }
});
