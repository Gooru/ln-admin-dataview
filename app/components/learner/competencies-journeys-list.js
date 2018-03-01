import Ember from 'ember';

export default Ember.Component.extend({


  classNames: ['competencies-journeys-list'],


  // -------------------------------------------------------------------------
  // Properties


  /**
   * It  will have Subject
   * @type {Object}
   */
  isSelectedSubject: Ember.computed('taxonomySubjects', function() {
    let component = this;
    let subject = component.get('taxonomySubjects').objectAt(0);
    return subject.subjectTitle;
  }),


  /**
   * It  will have Subject
   * @type {Object}
   */
  isSelectedCourse: Ember.computed('journeyCourses', function() {
    return 'Journeys Summary';
  }),


  //------------------------------------------------------------------------
  // actions

  actions: {
    chooseSubject: function(subject) {
      let component = this;
      component.set('isSelectedSubject', subject.subjectTitle);
      component.sendAction('selectedSubject', subject);
    },

    chooseCourse: function(course) {
      let component = this;
      component.set('isSelectedCourse', course.courseTitle);
      component.sendAction('selectedCourse', course);
    }
  }
});
