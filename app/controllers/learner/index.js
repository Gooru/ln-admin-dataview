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
      controller.transitionToRoute('learner.journeys', controller.get('userId'));
    },
    onExploreCompetencies: function() {
      let controller = this;
      controller.transitionToRoute('learner.competencies', controller.get('userId'));
    },
    onExploreTimeSpentActivities: function() {
      let controller = this;
      controller.transitionToRoute('learner.activites', controller.get('userId'));
    },
    onSelectCourse: function(courseId) {
      console.log(courseId);
      let controller = this;
      controller.transitionToRoute('learner.courses', controller.get('userId'));
    }
  }


});
