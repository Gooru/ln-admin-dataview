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
    let userId = learnerModel.userId;
    return Ember.RSVP.hash({
      userStatsContent: route.get('learnersService').getUserStatsContent(userId),
      userId: userId
    });
  },

  setupController: function(controller, model) {
    controller.set('learnerActivities', model.userStatsContent);
    controller.set('userId', model.userId);
  }
});
