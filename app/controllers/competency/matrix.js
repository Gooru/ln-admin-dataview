import Ember from 'ember';

export default Ember.Controller.extend({

  //---------------------------------------------------------------------------
  //Dependencies

  session: Ember.inject.service(),

  //---------------------------------------------------------------------------
  //Properties

  /**
   * It will have the data of  latest selected subject object.
   * @return {Object}
   */
  selectedSubject: Ember.computed('subjects', function() {
    let subject = this.get('subjects').objectAt(0);
    return subject;
  }),

  /**
   * Currently logged in user Id
   * @type {userId}
   */
  userId: Ember.computed.alias('session.user.id'),


  //---------------------------------------------------------------------------
  //Actions

  actions: {
    onChooseSubject: function(subjectIndex) {
      let controller = this;
      let subjects = controller.get('subjects');
      let subject= subjects.objectAt(subjectIndex);
      controller.set('selectedSubject', subject);
      Ember.$('.subject-name').removeClass('active');
      Ember.$('.subject-round-icon').removeClass('active');
      Ember.$(`.subject-${  subjectIndex}`).addClass('active');
    }
  }
});
