import Ember from 'ember';
import TaxonomySerializer from 'admin-dataview/serializers/taxonomy/taxonomy';
import TaxonomyAdapter from 'admin-dataview/adapters/taxonomy/taxonomy';

/**
 * API-SDK Service for the Taxonomies back-end endpoints
 *
 * @typedef {Object} APITaxonomyService
 */
export default Ember.Service.extend({
  taxonomySerializer: null,

  taxonomyAdapter: null,

  init() {
    this._super(...arguments);
    this.set(
      'taxonomySerializer',
      TaxonomySerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'taxonomyAdapter',
      TaxonomyAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Fetches the Taxonomy Subjects
   *
   * @param category - The classification type
   * @returns {Promise}
   */
  fetchSubjects: function(category) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('taxonomyAdapter')
        .fetchSubjects(category)
        .then(
          function(response) {
            resolve(
              service.get('taxonomySerializer').normalizeFetchSubjects(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Fetches the Taxonomy Subjects from DS
   *
   * @param category - The classification type
   * @returns {Promise}
   */
  fetchTaxonomySubjects(taxonomyCategory) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('taxonomyAdapter')
        .fetchTaxonomySubjects(taxonomyCategory)
        .then(
          function(response) {
            resolve(
              service
                .get('taxonomySerializer')
                .normalizeTaxonomySubjects(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Fetches the Taxonomy Courses
   *
   * @param frameworkId - the framework ID
   * @param subjectId - the taxonomy subject ID
   * @returns {Promise}
   */
  fetchCourses: function(frameworkId, subjectId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('taxonomyAdapter')
        .fetchCourses(frameworkId, subjectId)
        .then(
          function(response) {
            resolve(
              service.get('taxonomySerializer').normalizeFetchCourses(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Fetches the Taxonomy Domains
   *
   * @param frameworkId - the framework ID
   * @param subjectId - the taxonomy subject ID
   * @param courseId - the taxonomy course ID
   * @returns {Promise}
   */
  fetchDomains: function(frameworkId, subjectId, courseId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('taxonomyAdapter')
        .fetchDomains(frameworkId, subjectId, courseId)
        .then(
          function(response) {
            resolve(
              service.get('taxonomySerializer').normalizeFetchDomains(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Fetches the Taxonomy Codes
   *
   * @param frameworkId - the framework ID
   * @param subjectId - the taxonomy subject ID
   * @param courseId - the taxonomy course ID
   * @param domainId - the taxonomy domain ID
   * @returns {Promise}
   */
  fetchCodes: function(frameworkId, subjectId, courseId, domainId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('taxonomyAdapter')
        .fetchCodes(frameworkId, subjectId, courseId, domainId)
        .then(
          function(response) {
            resolve(
              service.get('taxonomySerializer').normalizeFetchCodes(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Fetches the Taxonomy Codes by IDs
   *
   * @param codesIds - the list of codes IDs
   * @returns {Promise}
   */
  fetchCodesByIds: function(codesIds) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('taxonomyAdapter')
        .fetchCodesByIds(codesIds)
        .then(
          function(response) {
            resolve(
              service.get('taxonomySerializer').normalizeFetchCodes(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Fetches the Taxonomy classifications.
   *
   * @returns {Promise}
   */
  fetchTaxonomyClassifications() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('taxonomyAdapter')
        .fetchTaxonomyClassifications()
        .then(
          function(response) {
            resolve(
              service
                .get('taxonomySerializer')
                .normalizeFetchClassification(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * @return {Promise}
   * fetchUserProfileGrades used to fetch user grade list
   */
  fetchUserProfileGrades() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('taxonomyAdapter')
        .fetchUserProfileGrades()
        .then(
          function(response) {
            resolve(
              service
                .get('taxonomySerializer')
                .normalizeUserProfileGrades(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  }
});
