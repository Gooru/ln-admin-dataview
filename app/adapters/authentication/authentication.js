import Ember from 'ember';

/**
 * Adapter for the Authentication (Login) with API 3.0
 *
 * @typedef {Object} AuthenticationAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-auth/v2',

  adminNamespace: '/api/nucleus-admin/v1',

  /**
   * Post a request to authenticate a google user
   * @param access token required to build the get headers
   * @returns {Promise}
   */
  authenticationWithToken(data) {
    const url = `${this.get('namespace')}/token`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: {
        Authorization: `Token ${data.accessToken}`
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Post a request to authenticate as admin user.
   * @param data values required to build the post body
   * @returns {Promise}
   */
  authenticateUsingCredentials: function(data) {
    const adapter = this;
    const namespace = this.get('adminNamespace');
    const url = `${namespace}/authentication`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: adapter.defineHeaders(data),
      global: false /* Stop global ajaxError event from triggering */
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Authenticates as a impersonate user using the  user id and admin access token.
   * @returns {Object}
   */
  authenticateAsImpersonateUser: function(userId, accessToken) {
    const namespace = this.get('adminNamespace');
    const url = `${namespace}/auth/user/impersonate/${userId}`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: {
        Authorization: `Token ${accessToken}`
      },
      data: '{}',
      global: false /* Stop global ajaxError event from triggering */
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Invalidates the current token
   * @returns {Promise}
   */
  signOut: function() {
    const namespace = this.get('namespace');
    const url = `${namespace}/signout`;
    const token = this.get('session.token-api3');
    const options = {
      type: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      headers: {
        Authorization: `Token ${token}`
      }
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders(data) {
    return {
      Authorization: `Basic ${btoa(`${data.username}:${data.password}`)}`
    };
  }
});
