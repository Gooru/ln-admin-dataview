import Ember from 'ember';
import CompetencyAdapter from 'admin-dataview/adapters/competency/competency';
import CompetencySerializer from 'admin-dataview/serializers/competency/competency';
/**
 * Service for the competency
 *
 * @typedef {Object} competencyService
 */
export default Ember.Service.extend({

  competencyAdapter: null,

  competencySerializer: null,

  init: function() {
    this._super(...arguments);
    this.set('competencyAdapter', CompetencyAdapter.create(Ember.getOwner(this).ownerInjection()));
    this.set('competencySerializer', CompetencySerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Get user competency summary
   * @returns {Promise.<[]>}
   */
  getUserCompetencyCourses: function(userId, competencyCode) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('competencyAdapter')
        .getUserCompetencyCourses(userId, competencyCode)
        .then(function(response) {
          resolve(service.get('competencySerializer').normalizeUserCompetencyCourses(response));
        }, reject);
    });
  },

  /**
   * Get user competency summary
   * @returns {Promise.<[]>}
   */
  getUserCompetencyCourseCollections: function(userId, courseId, competencyCode) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('competencyAdapter')
        .getUserCompetencyCourseCollections(userId, courseId, competencyCode)
        .then(function(response) {
          resolve(service.get('competencySerializer').normalizeUserCompetencyCourseCollections(response));
        }, reject);
    });
  },

  /**
   * Get Competency Matrix Coordinates for Subject
   * @returns {Promise.<[]>}
   */
  getCompetencyMatrixCoordinates: function(subject) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('competencyAdapter')
        .getCompetencyMatrixCoordinates(subject)
        .then(function(response) {
          resolve(service.get('competencySerializer').normalizeCompetencyMatrixCoordinates(response));
        }, reject);
    });
  },

  /**
   * Get user competency Matrix for subject
   * @returns {Promise.<[]>}
   */
  getCompetencyMatrix: function(user, subject) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('competencyAdapter')
        .getCompetencyMatrix(user, subject)
        .then(function(response) {
          resolve(service.get('competencySerializer').normalizeCompetencyMatrix(response));
        }, reject);
    });
  }

});
