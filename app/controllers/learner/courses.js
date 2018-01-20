import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Query

  queryParams: ['courseId'],

  courseId: null,

  actions: {
    onClickBackButton: function() {
      let controller = this;
      controller.transitionToRoute('learner');
    }
  }

});
