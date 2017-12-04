import Ember from 'ember';
import Env from 'admin-dataview/config/environment';
import EndPointsConfig from 'admin-dataview/utils/endpoint-config';

/**
 * Adapter for the Authentication (Login) with API 3.0
 *
 * @typedef {Object} AuthenticationAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-auth/v2',

  /**
   * Post a request to authenticate a normal user or anonymous user.
   * @param data values required to build the post body
   * @returns {Promise}
   */
  signIn: function(data) {
    const adapter = this;
    const endpointUrl = EndPointsConfig.getEndpointSecureUrl();
    const namespace = this.get('namespace');
    const url = `${endpointUrl}${namespace}/signin`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: adapter.defineHeaders(data),
      data: JSON.stringify({
        'client_key': Env['API-3.0'].clientKey,
        'client_id': Env['API-3.0'].clientId,
        'grant_type': 'credential'
      }),
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
    const token = this.get('session.accessToken');
    const options = {
      type: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Authorization' : `Token ${token}`
      }
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function(data) {
    if (data.isAnonymous) {
      return {};
    } else {
      return {
        'Authorization': `Basic ${  btoa(`${data.username  }:${  data.password}`)}`
      };
    }
  }

});
