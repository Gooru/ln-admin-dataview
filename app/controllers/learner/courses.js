import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Query

  queryParams: ['courseId', 'classId'],

  courseId: null,

  classId: null,

  actions: {
    onClickBackButton: function() {
      let controller = this;
      controller.transitionToRoute('learner');
    }
  }

});
