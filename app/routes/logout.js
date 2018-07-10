import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  /**
   * @property {Service} session
   */
  session: Ember.inject.service(),

  /**
   * Authentication (api-sdk/authentication) service.
   * @property {AuthenticationService} authService
   * @readOnly
   */
  authenticationService: Ember.inject.service('api-sdk/authentication'),

  beforeModel: function() {
    this._super(...arguments);
    const router = this;
    router
      .get('authenticationService')
      .signOut()
      .then(() => {
        router.get('session').invalidate();
      });
  }
});
