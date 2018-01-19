import Ember from 'ember';

export default Ember.Route.extend({

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:learners
   */
  learnersService: Ember.inject.service('api-sdk/learners'),

  //------------------------------------------------------------------------
  //Properties

  /**
   * User id of the learner
   * @type {String}
   */
  userId: null,

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function(transition) {
    this.set('userId', transition.params.learner.userId);
  },


  model: function() {
    let userId = this.get('userId');
    return Ember.RSVP.hash({
      userCompetencyStats: this.get('learnersService').getUserCompetencyStats(userId),
      userCompetencySummary: this.get('learnersService').getUserCompetencySummary(userId)
    });
  },


  setupController: function(controller, model) {
    let userId = this.get('userId');
    controller.set('competenciesData', model.userCompetencyStats);
    controller.set('competenciesSummary', model.userCompetencySummary);
    controller.set('userId', userId);
  }

});
