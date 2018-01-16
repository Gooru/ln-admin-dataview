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
      learnersProfileDistribution: this.get('learnersService').getLearnerProfileDistribution(),
      userStatsContent: this.get('learnersService').getUserStatsContent(userId),
      userStatsByCourse: this.get('learnersService').getUserStatsByCourse(userId),
      userJourneyStats: this.get('learnersService').getUserJourneyStats(userId),
      userCompetencyStats: this.get('learnersService').getUserCompetencyStats(userId)
    });
  },


  setupController: function(controller, model) {
    let userId = this.get('userId');
    controller.set('userJourneyStats', model.userJourneyStats);
    controller.set('competenciesData', model.userCompetencyStats);
    controller.set('userStatsContent', model.userStatsContent);
    controller.set('userStatsByCourse', model.userStatsByCourse);
    controller.set('userId', userId);
  }

});
