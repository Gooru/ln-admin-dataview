import Ember from 'ember';

/**
 * Adapter for Taxonomy endpoints
 *
 * @typedef {Object} TaxonomyAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/taxonomy',

  /**
   * @namespace namespaceStub
   * API Endpoint for grade list stub
   */
  namespaceStub: 'stubs',

  /**
   * @namespace taxonomyDSNamespace
   * API Endpoint of the DS users for taxonomy
   */
  taxonomyDSNamespace: '/api/ds/users/v2/tx',

  /**
   * Fetches the Taxonomy Subjects for the specific type
   *
   * @param category - The classification type
   * @returns {Promise}
   */
  fetchSubjects(category) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/subjects`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        classification_type: category
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the Taxonomy Subjects from the DS
   *
   * @param category - The classification type
   * @returns {Promise}
   */
  fetchTaxonomySubjects(category) {
    const adapter = this;
    const namespace = adapter.get('taxonomyDSNamespace');
    const url = `${namespace}/subjects`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        classificationType: category
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the Taxonomy Courses
   *
   * @param frameworkId - the framework ID
   * @param subjectId - the taxonomy subject ID
   * @returns {Promise}
   */
  fetchCourses(frameworkId, subjectId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/frameworks/${frameworkId}/subjects/${subjectId}/courses`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {}
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the Taxonomy Domains
   *
   * @param frameworkId - the framework ID
   * @param subjectId - the taxonomy subject ID
   * @param courseId - the taxonomy course ID
   * @returns {Promise}
   */
  fetchDomains(frameworkId, subjectId, courseId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/frameworks/${frameworkId}/subjects/${subjectId}/courses/${courseId}/domains`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {}
    };
    return Ember.$.ajax(url, options);
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
  fetchCodes(frameworkId, subjectId, courseId, domainId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/frameworks/${frameworkId}/subjects/${subjectId}/courses/${courseId}/domains/${domainId}/codes`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {}
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the Taxonomy Codes by a provided list of IDs
   *
   * @param codesIds - the list of codes IDs
   * @returns {Promise}
   */
  fetchCodesByIds(codesIds) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/codes`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        idList: codesIds.join(',')
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the Taxonomy classifications.
   *
   * @returns {Promise}
   */
  fetchTaxonomyClassifications() {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/classifications`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @return {Promise}
   * used to fetch user profile grade list
   */
  fetchUserProfileGrades() {
    const adapter = this;
    const namespace = adapter.get('namespaceStub');
    const url = `${namespace}/user-profile-grades.json`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.RSVP.hashSettled({
      taxonomyGrade: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.taxonomyGrade.value;
    });
  },

  defineHeaders() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }
});
