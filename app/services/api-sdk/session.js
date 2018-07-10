import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),

  /**
   * Creates a session with the specified access token
   * @param token - the access token
   * @returns {*|Ember.RSVP.Promise}
   */
  authenticateWithToken: function(token) {
    let data = {
      mode: 'token',
      accessToken: token
    };
    return this.get('session').authenticate('authenticator:auth-api-3', data);
  },

  /**
   * Creates a session with the specified user credentials
   * @param {Ember.Object} credentials - Object with username and password attributes
   * @returns {*|Ember.RSVP.Promise}
   */
  authenticateUsingCredentials: function(credentials) {
    let data = {
      mode: 'credentials',
      credentials: {
        username: credentials.get('username'),
        password: credentials.get('password')
      }
    };
    return this.get('session').authenticate('authenticator:auth-api-3', data);
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
