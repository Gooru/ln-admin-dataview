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


  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    return Ember.RSVP.hash({
      learnersProfileDistribution: this.get('learnersService').getLearnerProfileDistribution(),
      userStatsContent: this.get('learnersService').getUserStatsContent(params.userId),
      userStatsByCourse: this.get('learnersService').getUserStatsByCourse(params.userId),
      userJourneyStats: this.get('learnersService').getUserJourneyStats(params.userId),
      userCompetencyStats: this.get('learnersService').getUserCompetencyStats(params.userId)
    });
  },


  setupController: function(controller, model) {
    controller.set('userJourneyStats', model.userJourneyStats);
    controller.set('competenciesData', model.userCompetencyStats);
    controller.set('userStatsContent', model.userStatsContent);
    controller.set('userStatsByCourse', model.userStatsByCourse);
    controller.set('userId', model.userId);
  }

});
