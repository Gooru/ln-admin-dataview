import Ember from 'ember';

export default Ember.Component.extend({


  classNames: ['competencies-journeys-list'],


  //------------------------------------------------------------------------
  // actions

  actions: {

    chooseSubject: function(subject) {
      let component = this;
      component.set('isSelectedSubject', subject.subjectTitle);
    }

  }
});
