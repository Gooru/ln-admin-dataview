import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competencies-report-panel'],


  //------------------------------------------------------------------------
  //Dependencies

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * It  will have default subject category
   * @type {String}
   */
  selectedSubjectCategory: 'k_12',


  isCompetency: true,

  //------------------------------------------------------------------------
  // actions

  actions: {

    competencyMatrixTabs: function(tabs) {
      let component = this;
      component.set('isCompetency', tabs === 'competency');
      component.set('isJourney', tabs === 'journey');
    }

  },


  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    let component = this;
    let subjectCategory = component.get('selectedSubjectCategory');
    component.fetchSubjectsByCategory(subjectCategory);
  },


  fetchSubjectsByCategory: function(subjectCategory) {
    let component = this;
    component.set('isLoading', true);
    component.get('taxonomyService').getSubjects(subjectCategory).then(subjects => {
      component.set('subjectClassifications', subjects);
    });
  }

});
