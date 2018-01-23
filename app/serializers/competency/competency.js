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
  }

});
