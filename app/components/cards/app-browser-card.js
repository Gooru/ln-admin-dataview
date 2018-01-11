import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['app-browser-card'],


  actions: {
    getSubjects: function(category) {
      this.sendAction('getSubjects', category);
    },

    getFrameworks: function(subject) {
      this.sendAction('getFrameworks', subject);
    }
  }
});
