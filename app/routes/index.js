import Ember from 'ember';

export default Ember.Route.extend({

  // --------------------------------------------------------------------------
  // Dependencies

  /**
   * It has the session object of ember-simple-auth
   * @property {Session}
   */
  session: Ember.inject.service('session'),

  sessionService: Ember.inject.service('api-sdk/session'),


  // --------------------------------------------------------------------------
  // Methods

  model(params) {
    console.log(params);
      const route = this;
      let details = null;
      let accessToken = params.access_token;
      console.log(accessToken);
      if (accessToken) {
        details = this.get('sessionService')
          .signInWithToken(accessToken)
          .then(function() {
            const applicationController = route.controllerFor('application');
          });
      }
      return details;
    },

  setupController(controller, model) {
    this._super(controller, model);
    const session = this.get('session');
    controller.set('session', session);
  }
});
