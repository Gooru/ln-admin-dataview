import Ember from 'ember';

/**
 * Adapter to support the Competency API
 *
 * @typedef {Object} CompetencyAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/ds/users',

  /**
   * Get user  competency  course  report
   * @returns {Promise.<[]>}
   */
  getUserCompetencyCourses: function(user, competencyCode) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const url = 'stubs/stats/user-competencies-accordion-courses.json';
    //const url =`${namespace}/v1/user/performance/competency/collections`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        user,
        competencyCode
      }
    };
    return Ember.RSVP.hashSettled({
      userCompetencySummary: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userCompetencySummary.value;
    });
  },


  /**
   * Get user  competency  course collections report
   * @returns {Promise.<[]>}
   */
  getUserCompetencyCourseCollections: function(user, courseId, competencyCode) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const url = 'stubs/stats/user-competencies-accordion-course-collections.json';
    //const url =`${namespace}/v1/user/performance/competency/collections`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        user,
        competencyCode
      }
    };
    return Ember.RSVP.hashSettled({
      userCompetencySummary: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userCompetencySummary.value;
    });
  },


  /**
   * Get Competency Matrix Coordinates for Subject
   * @returns {Promise.<[]>}
   */
  getCompetencyMatrixCoordinates: function(subject) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const url = 'stubs/competency/CompetencyMatrixCoordinates.json';
    //const url =`${namespace}/v1/tx/competency/matrix/coordinates`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        subject
      }
    };
    return Ember.RSVP.hashSettled({
      competencyMatrixCoordinates: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.competencyMatrixCoordinates.value;
    });
  },

  /**
   * Get user competency Matrix for subject
   * @returns {Promise.<[]>}
   */
  getCompetencyMatrix: function(user, subject) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const url = 'stubs/competency/CompetencyMatrix.json';
    //const url =`${namespace}/v1/tx/competency/matrix`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        user,
        subject
      }
    };
    return Ember.RSVP.hashSettled({
      competencyMatrix: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.competencyMatrix.value;
    });
  },


  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
