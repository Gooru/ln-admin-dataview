import Ember from 'ember';

export default Ember.Route.extend({

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:journey
   */
  journeyService: Ember.inject.service('api-sdk/journey'),

  //-------------------------------------------------------------------------
  //Properties

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function(transition) {
    this.set('userId', transition.params.learner.userId);
  },

  model: function() {
    return Ember.RSVP.hash({
      userJourneyByCourses: this.get('journeyService').getUserJourneyByCourses(this.get('userId'))
    });
  },

  setupController: function(controller, model) {

    controller.set('userJourneyByCourses', model.userJourneyByCourses);
  }

});
