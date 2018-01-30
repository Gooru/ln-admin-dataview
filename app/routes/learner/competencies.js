import Ember from 'ember';

export default Ember.Route.extend({

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:learners
   */
  learnersService: Ember.inject.service('api-sdk/learners'),

  /**
   * @requires service:competency
   */
  competencyService: Ember.inject.service('api-sdk/competency'),


  //------------------------------------------------------------------------
  //Properties

  /**
   * User id of the learner
   * @type {String}
   */
  userId: null,

  // -------------------------------------------------------------------------
  // Methods


  model: function() {
    let learnerModel = this.modelFor('learner');
    let userId = learnerModel.userId;
    let selectedActiveDuration= learnerModel.selectedActiveDuration;
    return Ember.RSVP.hash({
      userCompetencyStats: this.get('learnersService').getUserCompetencyStats(userId),
      userCompetencies: this.get('competencyService').getUserCompetencies(userId, selectedActiveDuration),
      userId: userId
    });
  },


  setupController: function(controller, model) {
    controller.set('userCompetencyStats', model.userCompetencyStats);
    controller.set('userCompetencies', model.userCompetencies);
    controller.set('userId', model.userId);
  }

});
