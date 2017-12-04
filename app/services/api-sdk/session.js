
import Ember from 'ember';

export default Ember.Service.extend({

  session: Ember.inject.service('session'),

  /**
   * Creates a session with the specified user credentials
   * @param {Ember.Object} credentials - Object with username and password attributes
   * @returns {*|Ember.RSVP.Promise}
   */
  signInWithUser: function(credentials) {
    return this.get('session').authenticate('authenticator:auth-api-3', {
      username: credentials.get('username'),
      password: credentials.get('password')
    });
  },

  /**
   * Creates a session with the specified access token
   * @param token - the access token
   * @returns {*|Ember.RSVP.Promise}
   */
  signInWithToken: function(token) {
    return this.get('session').authenticate('authenticator:auth-api-3', {
      hasAccessToken: true,
      accessToken: token
    });
  },

  /**
   * Creates a session with the specified user
   * @param user - the user data
   * @returns {*|Ember.RSVP.Promise}
   */
  signUp: function(user) {
    return this.get('session').authenticate('authenticator:auth-api-3', {
      isAnonymous: false,
      user
    });
  },

  /**
   * Updates a session userData
   * @param userData - the user data
   */
  updateUserData: function(userData) {
    const session = this.get('session');
    session.set('user', userData);
  }

});
