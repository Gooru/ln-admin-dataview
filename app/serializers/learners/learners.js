import Ember from 'ember';

/**
 * Serializer for Learner endpoints
 *
 * @typedef {Object} LearnerSerializer
 */
export default Ember.Object.extend({


  /**
   * Normalized data of user  stats
   * @return {Object}
   */
  normalizeUserStats: function(response) {
    let resultSet = Ember.A();
    response = Ember.Object.create(response);
    Object.keys(response).forEach(key => {
      let count = response.get(key);
      let data = Ember.Object.create({
        name: key,
        value: count
      });
      resultSet.pushObject(data);
    });
    return resultSet;
  },

  /**
   * Normalized data of user stats by course
   * @return {Object}
   */
  normalizeUserStatsBycourse: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.courses);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      result.set('value', result.get('timespent'));
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized data of learner profile distribution
   * @return {Object}
   */
  normalizeLearnerProfileDistribution: function(response) {
    let resultSet = Ember.Object.create(response);
    Object.keys(response).forEach(key => {
      let result = Ember.A();
      resultSet.get(key).forEach(data => {
        result.pushObject(Ember.Object.create(data));
      });
      resultSet.set(key, result);
    });
    return resultSet;
  }

});
