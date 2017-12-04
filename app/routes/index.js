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
    const route = this;
    let details = null;
    let accessToken = params.access_token;
    if (accessToken) {
      details = route.get('sessionService')
        .signInWithToken(accessToken);
    }
    return details;
  },

  setupController(controller, model) {
    this._super(controller, model);
    const session = this.get('session');
    controller.set('session', session);
  }
});
