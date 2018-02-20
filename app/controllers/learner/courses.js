import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Query

  queryParams: ['courseId', 'classId', 'courseTitle'],

  courseId: null,

  classId: null,

  courseTitle: null,

  actions: {
    onClickBackButton: function() {
      let controller = this;
      controller.transitionToRoute('learner');
    }
  }

});
