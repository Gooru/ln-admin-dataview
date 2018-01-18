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
      userPerformanceUnits: this.get('performanceService').getUserPerformanceUnits(userId, 'course-id', 'class-id'),
      userPerformanceLessons: this.get('performanceService').getUserPerformanceLessons(userId, 'course-id', 'unit-id', 'class-id'),
      userPerformanceCollections: this.get('performanceService').getUserPerformanceCollections(userId, 'course-id', 'unit-id', 'lesson-id', 'class-id'),
      userPerformanceResourceInAssessments: this.get('performanceService').getUserPerformanceResourceInAssessment(userId, 'course-id', 'unit-id', 'lesson-id', 'collection-id', 'session-id', 'class-id'),
      userPerformanceResourceInCollections: this.get('performanceService').getUserPerformanceResourceInCollection(userId, 'course-id', 'unit-id', 'lesson-id', 'collection-id', 'session-id', 'class-id')
    });
  },


  setupController: function(controller, model) {
    controller.set('userPerformanceUnits', model.userPerformanceUnits);
  }

});
