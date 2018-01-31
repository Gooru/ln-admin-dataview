import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['learner', 'independent-course-card'],


  //------------------------------------------------------------------------
  // Events

  actions: {

    courseReport: function(course) {
      this.get('router').transitionTo('learner.courses', course.courseId);
    }
  },


  // -------------------------------------------------------------------------
  // Properties

  Performances: Ember.computed(function() {
    let course = this.get('course');
    let percentagewidth = course.assessmentsCompleted / course.totalAssessments * 100;
    let objects = {
      percentage: Math.round(percentagewidth)
    };
    return objects;
  })


});
