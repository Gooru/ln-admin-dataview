import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

/**
 * The Ember Simple Auth authenticator for Admin
 *
 * @typedef {Object} Admin Auth API
 */
export default BaseAuthenticator.extend({
  authenticationService: Ember.inject.service('api-sdk/authentication'),

  restore(data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate(data) {
    return this.get('authenticationService')
      .authenticateUsingCredentials(
        data.credentials.username,
        data.credentials.password
      )
      .then(response => {
        let userId = response.user.id;
        let accessToken = response.accessToken;
        return this.get('authenticationService')
          .authenticateAsImpersonateUser(userId, accessToken)
          .then(res => {
            response.accessToken = res.access_token;
            return response;
          });
      });
  }
});
