import Ember from 'ember';
import AuthenticationSerializer from 'admin-dataview/serializers/authentication/authentication';
import AuthenticationAdapter from 'admin-dataview/adapters/authentication/authentication';

/**
 * Service for the Authentication
 *
 * @typedef {Object} AuthenticationService
 */
export default Ember.Service.extend({
  authenticationSerializer: null,

  authenticationAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'authenticationSerializer',
      AuthenticationSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'authenticationAdapter',
      AuthenticationAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Authenticates as a normal user using access token
   * @param accessToken user access token
   * @returns {Object} the normalized response from the endpoint
   */
  authenticateWithToken: function(accessToken) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('authenticationAdapter')
        .authenticationWithToken({
          accessToken
        })
        .then(function(response) {
          resolve(
            service
              .get('authenticationSerializer')
              .normalizeResponse(response, false, accessToken)
          );
        }, reject);
    });
  },

  /**
   * Authenticates as a normal user using the credentials
   * @param username account username
   * @param password account password
   * @returns {Object} the normalized response from the endpoint
   */
  authenticateUsingCredentials: function(username, password) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('authenticationAdapter')
        .authenticateUsingCredentials({
          username: username,
          password: password
        })
        .then(function(response) {
          resolve(
            service
              .get('authenticationSerializer')
              .normalizeResponse(response, false)
          );
        }, reject);
    });
  },

  /**
   * Authenticates as a impersonate user using the self user id and admin access token.
   * @returns {Object}
   */
  authenticateAsImpersonateUser: function(userId, accessToken) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('authenticationAdapter')
        .authenticateAsImpersonateUser(userId, accessToken)
        .then(function(response) {
          resolve(response);
        }, reject);
    });
  },

  /**
   * Invalidates current token
   */
  signOut: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('authenticationAdapter')
        .signOut()
        .then(resolve, reject);
    });
  }
});
