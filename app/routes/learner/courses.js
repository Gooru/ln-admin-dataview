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

  queryParams: {
    courseId: {
      refreshModel: true
    }
  },

  courseId: null,

  // -------------------------------------------------------------------------
  // Methods
  beforeModel: function(transition) {
    let route = this;
    route.set('courseId', transition.params['learner.courses'].courseId);
  },

  model: function() {
    let route = this;
    let learnerModel = route.modelFor('learner');
    let userId = learnerModel.userId;
    let courseId = route.get('courseId');
    let unitsPromise = Ember.RSVP.resolve(route.get('performanceService').getUserPerformanceUnits(userId, courseId, 'class-id'));
    return Ember.RSVP.hash({
      userPerformanceUnits: unitsPromise
    })
      .then(function(hash) {
        return hash;
      });
  },


  setupController: function(controller, model) {
    controller.set('userPerformanceUnits', model.userPerformanceUnits);
  }

});
