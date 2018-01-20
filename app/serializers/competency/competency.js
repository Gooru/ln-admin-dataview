import Ember from 'ember';

/**
 * Serializer for Competency endpoints
 *
 * @typedef {Object} CompetencySerializer
 */
export default Ember.Object.extend({

  /**
   * Normalized data of user competency summary
   * @return {Object}
   */
  normalizeUserCompetencySummary: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.competencies);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  }

});
