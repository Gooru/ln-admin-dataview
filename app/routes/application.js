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

  /**
   * The session service.
   * @property session
   * @readOnly
   */
  sessionService: Ember.inject.service('session'),

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

  beforeModel() {
    const route = this;
    let details = null;
    details = route.get('configurationService').loadConfiguration();
    return details;
  },

  // -------------------------------------------------------------------------
  // Actions - only transition actions should be placed at the route
  actions: {}
});
