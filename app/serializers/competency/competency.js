import Ember from 'ember';

/**
 * Serializer for Competency endpoints
 *
 * @typedef {Object} CompetencySerializer
 */
export default Ember.Object.extend({

  /**
   * Normalized data of user competency courses data
   * @return {Object}
   */
  normalizeUserCompetencyCourses: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.competencies);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized data of user competency courses collections
   * @return {Object}
   */
  normalizeUserCompetencyCourseCollections: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.data);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized data of  competency matrix coordinates
   * @return {Object}
   */
  normalizeCompetencyMatrixCoordinates: function(response) {
    let resultSet = Ember.Object.create(response);
    Object.keys(response).forEach(key => {
      let result = Ember.A();
      resultSet.get(key).forEach(data => {
        result.pushObject(Ember.Object.create(data));
      });
      resultSet.set(key, result);
    });
    return resultSet;
  },

  /**
   * Normalized data of user competency matrix
   * @return {Object}
   */
  normalizeCompetencyMatrix: function(response) {
    let userCompetencyMatrix = Ember.A(response.userCompetencyMatrix);
    let resultSet = Ember.A();
    userCompetencyMatrix.forEach(courseData => {
      let course = Ember.Object.create(courseData);
      let domains = course.get('domains');
      let domainSet = Ember.A();
      domains.forEach(data => {
        domainSet.pushObject(Ember.Object.create(data));
      });
      course.set('domains', domainSet);
      resultSet.pushObject(course);
    });
    return resultSet;
  }

});
