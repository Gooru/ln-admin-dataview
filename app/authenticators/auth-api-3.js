import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

/**
 * The Ember Simple Auth authenticator for Admin
 *
 * @typedef {Object} Admin Auth API
 */
export default BaseAuthenticator.extend({

  authenticationService: Ember.inject.service('api-sdk/authentication'),

  restore: function (data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate: function(options) {
    let promise;
    if (options.hasAccessToken) {
      promise = this.get('authenticationService').authenticateWithToken(
        options.accessToken
      );
    } else {
      promise = this.get('authenticationService').signIn(options.username, options.password);
    }
    return promise.then(response => {
      let localStorage = window.localStorage;
      let itemId = `${response.user.id  }_logins`;
      let localStorageItem = localStorage.getItem(itemId);
      if(!localStorageItem) {
        localStorage.setItem(itemId, 1);
      } else {
        localStorage.setItem(itemId, localStorageItem + 1);
      }
      return response;
    });
  }
});
