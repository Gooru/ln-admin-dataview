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


  //------------------------------------------------------------------------
  // actions

  actions: {
    chooseSubject: function(subject) {
      let component = this;
      component.set('isSelectedSubject', subject.subjectTitle);
      component.sendAction('selectedSubject', subject);
    }
  }
});
