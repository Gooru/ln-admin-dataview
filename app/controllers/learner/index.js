import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Properties

  /**
   * User id of the learner
   * @type {String}
   */
  userId: null,

  // -------------------------------------------------------------------------
  // Actions

  actions:  {
    onExploreJourneyTaken: function() {
      let controller = this;
      controller.transitionToRoute('learner.journeys-taken', controller.get('userId'));
    },
    onExploreCompetencies: function() {
      let controller = this;
      controller.transitionToRoute('learner.competencies', controller.get('userId'));
    },
    onExploreTimeSpentActivities: function() {
      let controller = this;
      controller.transitionToRoute('learner.time-spent-courses', controller.get('userId'));
    },
    onExploreTimeSpentCourse: function() {
      let controller = this;
      controller.transitionToRoute('learner.time-spent-courses', controller.get('userId'));
    }
  }


});
