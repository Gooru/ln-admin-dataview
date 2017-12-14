import Ember from 'ember';
import EndPointsConfig from 'admin-dataview/utils/endpoint-config';

/**
 * Initialize session validation function
 */
export function initialize(instance) {
  Ember.$(document).ajaxError(function(event, jqXHR) {
    if (jqXHR.status === 401) {
      const sessionService = instance.container.lookup('service:session');
      if (sessionService.get('isAuthenticated')) {
        sessionService.invalidate();
      }
      window.location.replace(`${EndPointsConfig.getGooruAppUrl()  }/sign-in`);
    }
  });
}

export default {
  name: 'application-session-validation',
  after: 'application-session-service',
  initialize: initialize
};
