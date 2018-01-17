import Ember from 'ember';

/**
 * Adapter to support the Performance API
 *
 * @typedef {Object} PerformanceAdapter
 */
export default Ember.Object.extend({

  namespace: '/stubs',

  /**
   * Get performance of user performance units
   * @returns {Promise.<[]>}
   */
  getUserPerformanceUnits: function(userId, courseId, classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/performance/user-performance-units-${userId}-${courseId}-${classId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        courseId,
        classId
      }
    };
    return Ember.RSVP.hashSettled({
      userPerformanceUnits: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userPerformanceUnits.value;
    });
  },

  /**
   * Get performance of user performance lessons
   * @returns {Promise.<[]>}
   */
  getUserPerformanceLessons: function(userId, courseId, unitId,  classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/performance/user-performance-lessons-${userId}-${courseId}-${unitId}-${classId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        courseId,
        unitId,
        classId
      }
    };
    return Ember.RSVP.hashSettled({
      userPerformanceLessons: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userPerformanceLessons.value;
    });
  },

  /**
   * Get performance of user performance collections
   * @returns {Promise.<[]>}
   */
  getUserPerformanceCollections: function(userId, courseId, unitId, lessonId,  classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/performance/user-performance-collections-${userId}-${courseId}-${unitId}-${lessonId}-${classId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        courseId,
        unitId,
        lessonId,
        classId
      }
    };
    return Ember.RSVP.hashSettled({
      userPerformanceCollections: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userPerformanceCollections.value;
    });
  },

  /**
   * Get performance of user  resource in assessments
   * @returns {Promise.<[]>}
   */
  getUserPerformanceResourceInAssessment: function(userId, courseId, unitId, lessonId, collectionId, sessionId, classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/performance/user-performance-resource-in-assessment-${userId}-${courseId}-${unitId}-${lessonId}-${collectionId}-${sessionId}-${classId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        courseId,
        unitId,
        lessonId,
        collectionId,
        sessionId,
        classId
      }
    };
    return Ember.RSVP.hashSettled({
      userResourceInAssessment: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userResourceInAssessment.value;
    });
  },

  /**
   * Get performance of user  resource in collection
   * @returns {Promise.<[]>}
   */
  getUserPerformanceResourceInCollection: function(userId, courseId, unitId, lessonId, collectionId, sessionId, classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/performance/user-performance-resource-in-collection-${userId}-${courseId}-${unitId}-${lessonId}-${collectionId}-${sessionId}-${classId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        courseId,
        unitId,
        lessonId,
        collectionId,
        sessionId,
        classId
      }
    };
    return Ember.RSVP.hashSettled({
      userResourceInCollection: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userResourceInCollection.value;
    });
  },


  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
