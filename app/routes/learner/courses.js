import Ember from 'ember';

export default Ember.Route.extend({

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  //-------------------------------------------------------------------------
  //Properties

  // -------------------------------------------------------------------------
  // Methods


  model: function() {
    let learnerModel = this.modelFor('learner');
    let userId = learnerModel.userId;
    return Ember.RSVP.hash({
      userPerformanceUnits: this.get('performanceService').getUserPerformanceUnits(userId, 'course-id', 'class-id')
    });
  },


  setupController: function(controller, model) {
    controller.set('userPerformanceUnits', model.userPerformanceUnits);
  }

});
