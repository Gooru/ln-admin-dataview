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

  beforeModel: function(transition) {
    this.set('userId', transition.params.learner.userId);
  },

  model: function() {
    return Ember.RSVP.hash({
      userPerformanceUnits: this.get('performanceService').getUserPerformanceUnits(this.get('userId'), 'course-id', 'class-id'),
      userPerformanceLessons: this.get('performanceService').getUserPerformanceLessons(this.get('userId'), 'course-id', 'unit-id', 'class-id'),
      userPerformanceCollections: this.get('performanceService').getUserPerformanceCollections(this.get('userId'), 'course-id', 'unit-id', 'lesson-id', 'class-id'),
      userPerformanceResourceInAssessments: this.get('performanceService').getUserPerformanceResourceInAssessment(this.get('userId'), 'course-id', 'unit-id', 'lesson-id', 'collection-id', 'session-id', 'class-id'),
      userPerformanceResourceInCollections: this.get('performanceService').getUserPerformanceResourceInCollection(this.get('userId'), 'course-id', 'unit-id', 'lesson-id', 'collection-id', 'session-id', 'class-id')
    });
  },


  setupController: function(controller, model) {
    controller.set('userPerformanceUnits', model.userPerformanceUnits);
  }

});
