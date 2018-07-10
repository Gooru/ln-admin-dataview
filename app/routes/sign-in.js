import Ember from 'ember';

export default Ember.Route.extend({
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

  beforeModel() {
    if (this.get('isAuthenticated')) {
      this.transitionTo('competency.tree');
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
