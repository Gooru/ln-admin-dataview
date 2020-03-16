import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['app-browser-card'],

  // -------------------------------------------------------------------------
  // Properties

  selectedFrameworks: [],

  currentSubjectId: null,

  defaultCategory: null,

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    let component = this;
    component.$(`#${component.get('defaultCategory')}`).addClass('active');
    component
      .$(`[data-id = '${component.get('currentSubjectId')}']`)
      .addClass('active');
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /*
     * Event triggered when user click category to pull subjects
     */
    getSubjects: function(category) {
      let component = this;
      component
        .$('.category-card .current-level-value a')
        .removeClass('active');
      component.$('.subject-card .current-level-value a').removeClass('active');
      component.$(`#${category}`).addClass('active');
      component.sendAction('getSubjects', category);
    },

    /*
     * Event triggered when user click subbject to pull frameworks
     */
    getFrameworks: function(subject, elementIndex) {
      let component = this;
      component.$('.subject-card .current-level-value a').removeClass('active');
      component.$(`#subject-${elementIndex}`).addClass('active');
      component.sendAction('getFrameworks', subject);
    },

    /*
     * Event triggered when user click framework item
     */
    selectCheckableItem: function(frameworkItem) {
      let component = this;
      let frameworkId = frameworkItem.frameworkId;
      component.sendAction('frameworkStack', frameworkId);
    }
  }
});
