import Ember from 'ember';

/**
 * Serializer for journey endpoints
 *
 * @typedef {Object} PerformanceSerializer
 */
export default Ember.Object.extend({

  /**
   * Get journey of user taken (courses and IL's courses)
   * @returns {Promise.<[]>}
   */
  normalizeUserJourneyByCourses: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.journeys);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  }

});
