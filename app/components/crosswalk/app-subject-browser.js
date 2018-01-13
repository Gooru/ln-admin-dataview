import Ember from 'ember';
import {TAXONOMY_CATEGORIES} from 'admin-dataview/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['app-subject-browser'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
  * Search service to fetch content details
  */
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Properties

  /**
  * List of categories
  */
  categories: TAXONOMY_CATEGORIES,

  /**
  * List of subjects
  */
  subjects: [],

  /**
  * List of frameworks
  */
  frameworks: [],

  /**
  * Selected subject id
  */
  currentSubjectId: null,

  /**
  * Is subject level visible
  */
  isShowSubjectLevel: false,

  /**
  * Is framework level visible
  */
  isShowFrameworkLevel: false,

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
    * Action triggered when user click category to pull subjects
    */
    getSubjects: function(category) {
      let component = this;
      return component.fetchTaxonomySubjects(category);
    },

    /**
    * Action triggered when user click subject to pull frameworks
    */
    getFrameworks: function(subject) {
      let component = this;
      component.set('currentSubjectId', subject.id);
      return component.fetchTaxonomyFrameworks(subject);
    },

    /**
    * Action triggered when checkbox maximum limit exists
    */
    frameworkLimitExceed: function(selectedFrameworks) {
      let component = this;
      let subjectId = component.get('currentSubjectId');
      return component.sendAction('frameworkLimitExceed', subjectId, selectedFrameworks);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
  * @param category
  * Method to fetchTaxonomySubjects
  */
  fetchTaxonomySubjects(category) {
    let component = this;
    const subjectsPromise = Ember.RSVP.resolve(component.get('taxonomyService').getSubjects(category));
    return Ember.RSVP.hash({
      subjectsList: subjectsPromise
    })
      .then(function(hash) {
        component.set('subjects', hash.subjectsList);
        component.set('isShowFrameworkLevel', false);
        component.set('isShowSubjectLevel', true);
      });
  },

  /**
  * @param subject
  * Method to fetchTaxonomyFrameworks
  */

  fetchTaxonomyFrameworks(subject) {
    let component = this;
    component.set('frameworks', subject.frameworks);
    component.set('isShowFrameworkLevel', true);
  }
});
