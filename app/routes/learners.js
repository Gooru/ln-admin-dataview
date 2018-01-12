import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:learners
   */
  learnersService: Ember.inject.service('api-sdk/learners'),

  //-------------------------------------------------------------------------
  //Properties

  // -------------------------------------------------------------------------
  // Actions
  actions: {},

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    return Ember.RSVP.hash({
      learnersLocationBasedCount: this.get('learnersService').getLearnersLocationBasedCount()
    });
  },

  setupController: function(controller, model) {
    controller.set('learnersLocationBasedCount', model.learnersLocationBasedCount);
  }

});
