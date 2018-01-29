import Ember from 'ember';
import {DEFAULT_IMAGES} from 'admin-dataview/config/config';
/**
 * Serializer for Learner endpoints
 *
 * @typedef {Object} LearnerSerializer
 */
export default Ember.Object.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service(),


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


  /**normalizeActiveUserDistrbutionBySubject
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
  },

  /**
   * Normalized data of active user distrbution by subject
   * @return {Object}
   */
  normalizeActiveUserDistrbutionBySubject: function(response) {
    let resultSet = Ember.A();
    let cdnUrls = this.get('session.cdnUrls');
    response = Ember.A(response.users);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      let thumbnail = result.get('thumbnail');
      if(!thumbnail) {
        result.set('thumbnail', DEFAULT_IMAGES.USER_PROFILE);
      } else {
        result.set('thumbnail', cdnUrls.user + thumbnail);
      }
      resultSet.pushObject(result);
    });
    return resultSet;
  }

});
