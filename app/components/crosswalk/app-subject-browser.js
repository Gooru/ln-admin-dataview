import Ember from 'ember';
import {TAXONOMY_CATEGORIES} from 'admin-dataview/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['crosswalk', 'app-subject-browser'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
  * Search service to fetch content details
  */
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Properties

  categories: TAXONOMY_CATEGORIES,

  subjects: [],

  frameworks: [],

  isShowSubjectLevel: false,

  isShowFrameworkLevel: false,

  actions: {
    getSubjects: function(category) {
      let component = this;
      return component.fetchTaxonomySubjects(category);
    },

    getFrameworks: function(subject) {
      let component = this;
      return component.fetchTaxonomyFrameworks(subject);
    }
  },

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
    })
  },

  fetchTaxonomyFrameworks(subject) {
    let component = this;
    component.set('frameworks', subject.frameworks);
    component.set('isShowFrameworkLevel', true);
  }
});
