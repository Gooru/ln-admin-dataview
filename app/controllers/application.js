import Ember from 'ember';
import ConfigurationMixin from 'admin-dataview/mixins/configuration';

export default Ember.Controller.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service('session'),
  /**
   * Authentication (api-sdk/authentication) service.
   * @property {AuthenticationService} authService
   * @readOnly
   */
  authenticationService: Ember.inject.service('api-sdk/authentication'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onMenuItemSelection(item) {
      if (item === 'network') {
        window.location.href = '/network';
      } else if (item === 'learners') {
        window.location.href = '/learners';
      } else {
        if (item === 'competency') {
          this.transitionToRoute(`${item}.tree`);
        } else if (item === 'catalog') {
          this.transitionToRoute('activities');
        } else {
          this.transitionToRoute(item);
        }
      }
    },

    logout() {
      this.transitionToRoute('logout');
    }
  }
});
