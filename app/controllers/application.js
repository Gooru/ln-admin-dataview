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
    /**
     * Action triggered after a user has signed in
     * @see sign-in.hbs
     */
    signIn: function() {
      return true;
    },

    /**
     * Action triggered when logging out
     */
    logout: function() {
      this.get('session').invalidate();
      this.get('authenticationService').signOut();
      this.send('onLogout');
    }

  }

});
