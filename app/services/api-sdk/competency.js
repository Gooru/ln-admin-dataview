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
   * Get user competencies
   * @returns {Promise.<[]>}
   */
  getUserCompetencies: function(userId, activeDuration) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('competencyAdapter')
        .getUserCompetencies(userId, activeDuration)
        .then(function(response) {
          resolve(service.get('competencySerializer').normalizeUserCompetencies(response));
        }, reject);
    });
  },

  /**
   * Get user performance competency collections
   * @returns {Promise.<[]>}
   */
  getUserPerformanceCompetencyCollections: function(userId, competencyCode) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('competencyAdapter')
        .getUserPerformanceCompetencyCollections(userId, competencyCode)
        .then(function(response) {
          resolve(service.get('competencySerializer').normalizeUserPerformanceCompetencyCollections(response));
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
