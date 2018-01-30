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
  //Events

  model: function() {
    let route = this;
    let learnerModel = this.modelFor('learner');
    let selectedActiveDuration= learnerModel.selectedActiveDuration;
    let userId = learnerModel.userId;
    return Ember.RSVP.hash({
      userTimeSpentStats: route.get('learnersService').getUserTimeSpentStats(userId, selectedActiveDuration),
      userId: userId,
      selectedActiveDuration: selectedActiveDuration
    });
  },

  setupController: function(controller, model) {
    controller.set('learnerActivities', model.userTimeSpentStats);
    controller.set('userId', model.userId);
    controller.set('selectedActiveDuration', model.selectedActiveDuration);
  }
});
