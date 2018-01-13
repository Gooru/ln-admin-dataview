import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['app-browser-card'],

  // -------------------------------------------------------------------------
  // Properties

  selectedFrameworks: [],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /*
    * Event triggered when user click category to pull subjects
    */
    getSubjects: function(category) {
      let component = this;
      component.$('.category-card .current-level-value a').removeClass('active');
      component.$(`#${category}`).addClass('active');
      component.sendAction('getSubjects', category);
    },

    /*
    * Event triggered when user click subbject to pull frameworks
    */
    getFrameworks: function(subject) {
      let component = this;
      component.$('.subject-card .current-level-value a').removeClass('active');
      component.$(`.${subject.id}`).addClass('active');
      component.sendAction('getFrameworks', subject);
    },

    /*
    * Event triggered when user click framework item
    */
    selectCheckableItem: function(frameworkItem) {
      let component = this;
      component.get('selectedFrameworks').push(frameworkItem.frameworkId);
      let selectedFrameworks = component.get('selectedFrameworks');
      if (selectedFrameworks.length > 4) {
        component.sendAction('frameworkLimitExceed', selectedFrameworks);
        component.set('selectedFrameworks', []);
      }
    }
  }
});
