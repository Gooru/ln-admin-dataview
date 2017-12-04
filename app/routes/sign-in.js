import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
export default Ember.Route.extend(UnauthenticatedRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} Session
   */
  session: Ember.inject.service(),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  //--------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean} isAuthenticated
   */
  isAuthenticated: Ember.computed.alias('session.isAuthenticated'),

  // -------------------------------------------------------------------------
  // Methods

  model() {
    if(this.get('isAuthenticated')) {
      this.transitionTo('index');
    }
  },

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller) {
    // remove old notifications
    this.get('notifications').remove();
    controller.resetProperties();
  }

});
