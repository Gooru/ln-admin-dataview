import Ember from 'ember';

import ConfigurationMixin from 'admin-dataview/mixins/configuration';

/**
 * @typedef {object} ApplicationRoute
 */
export default Ember.Route.extend(ConfigurationMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  i18n: Ember.inject.service(),


  /**
     * Authentication (api-sdk/session) service.
     * @property authService
     * @readOnly
     */
  authService: Ember.inject.service('api-sdk/session'),

  /**
     * @type {SessionService} Service to retrieve session information
     */
  session: Ember.inject.service(),

  /**
     * @requires service:notifications
     */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    const route = this;
    const currentSession = route.get('session.data.authenticated');
    return Ember.RSVP.hash({
      currentSession: currentSession
    });
  },

  afterModel: function() {
    const route = this;
    route.set('i18n.locale', 'en');
  },

  deactivate: function() {
    Ember.$(document).off('ajaxError');
  },

  beforeModel(transition) {
    const params = transition.queryParams;
    const route = this;
    let details = null;
    details = route.get('configurationService').loadConfiguration().then(function(configuration) {
      let accessToken = params.access_token;
      if (accessToken) {
       route.get('authService').authenticateWithToken(accessToken).then(function() {
          route.transitionTo('gcm', { queryParams: { access_token: undefined }});
        });
      }
    });
    return details;
  },

  // -------------------------------------------------------------------------
  // Actions - only transition actions should be placed at the route
  actions: {

  }
});
