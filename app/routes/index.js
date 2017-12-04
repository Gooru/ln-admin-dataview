import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * [session description]
   * @type {[type]}
   */
  session: Ember.inject.service('session'),

  setupController(controller, model) {
    this._super(controller, model);
    const session = this.get('session');
    controller.set('session', session);
  }
});
