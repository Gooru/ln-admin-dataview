import Ember from 'ember';

/**
 * Adapter to support user profile, grades and prefs
 *
 * @typedef {Object} ProfileAdapter
 */
export default Ember.Object.extend({

  namespace: '/stubs',

  /**
   * Get User profile
   * @returns {Promise.<[]>}
   */
  getUserProfile: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/profile/user-profile-${userId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.RSVP.hashSettled({
      userProfile: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userProfile.value;
    });
  },

  /**
   * Get User grades
   * @returns {Promise.<[]>}
   */
  getUserGrades: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/profile/user-grade-${userId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.RSVP.hashSettled({
      userGrades: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userGrades.value;
    });
  },

  /**
   * Get user prefs content
   * @returns {Promise.<[]>}
   */
  getUserPrefsContent: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/profile/user-prefs-content-${userId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.RSVP.hashSettled({
      userPrefsContent: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userPrefsContent.value;
    });
  },

  /**
   * Get user prefs providers
   * @returns {Promise.<[]>}
   */
  getUserPrefsProviders: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/profile/user-prefs-provider-${userId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.RSVP.hashSettled({
      userPrefsProviders: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userPrefsProviders.value;
    });
  },

  /**
   * Get user prefs curators
   * @returns {Promise.<[]>}
   */
  getUserPrefsCurators: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/profile/user-prefs-curators-${userId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.RSVP.hashSettled({
      userPrefsCurators: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userPrefsCurators.value;
    });
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
