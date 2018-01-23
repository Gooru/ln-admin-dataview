import Ember from 'ember';

export default Ember.Controller.extend({

  //------------------------------------------------------------------------
  //Events
  classNames: ['learner-activities'],

  //------------------------------------------------------------------------
  //Properties
  /**
   * @property to store list of activities data
   */
  learnerActivities: [],

  //------------------------------------------------------------------------
  //Actions
  actions: {
    onClickBackButton: function() {
      let controller = this;
      controller.transitionToRoute('learner');
    }
  }


});
