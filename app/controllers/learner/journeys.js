import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {course} course information
   */
  course: null,

  /**
   * @property {userId} user information
   */
  userId: null,

  /**
   * @property {object} user with class information
   */
  courseInClass: Ember.computed('userJourneyByCourses', function() {
    let courses = this.get('userJourneyByCourses');
    let resultSet = Ember.A();
    courses.forEach(function(item) {
      if (item.classId) {
        resultSet.pushObject(item);
      }
    });
    return resultSet;
  }),

  courseNoClass: Ember.computed('userJourneyByCourses', function() {
    let courses = this.get('userJourneyByCourses');
    let resultSet = Ember.A();
    courses.forEach(function(item) {
      if (!item.classId) {
        resultSet.pushObject(item);
      }
    });
    return resultSet;
  }),


  //------------------------------------------------------------------------
  // Events

  actions: {

    onClickBackButton: function() {
      this.transitionToRoute('learner');
    }
  }

});
