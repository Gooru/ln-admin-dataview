import Ember from 'ember';
import LearnersAdapter from 'admin-dataview/adapters/learners/learners';

/**
 * Service for the learners
 *
 * @typedef {Object} learnersService
 */
export default Ember.Service.extend({

  learnersAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set('learnersAdapter', LearnersAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Fetch the learners profile distribution
   * @returns {Object}
   */
  getLearnerProfileDistribution: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('learnersAdapter')
        .getLearnerProfileDistribution()
        .then(function(response) {
          let resultSet = Ember.Object.create(response);
          Object.keys(response).forEach(key => {
            let result = Ember.A();
            resultSet.get(key).forEach(data => {
              result.pushObject(Ember.Object.create(data));
            });
            resultSet.set(key, result);
          });
          resolve(resultSet);
        }, reject);
    });
  },

  /**
   * Get user stats content count
   * @returns {Promise.<[]>}
   */
  getUserStatsContent: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('learnersAdapter')
        .getLearnerProfileDistribution()
        .then(function(response) {
          resolve(Ember.Object.create(response));
        }, reject);
    });
  },

  /**
   * Get user stats by courses
   * @returns {Promise.<[]>}
   */
  getUserStatsByCourse: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('learnersAdapter')
        .getUserStatsByCourse()
        .then(function(response) {
          let resultSet = Ember.Object.create(response);
          Object.keys(response).forEach(key => {
            resultSet.set(key, Ember.A(resultSet.get(key)));
          });
          resolve(resultSet);
        }, reject);
    });
  },

  /**
   * Get user  journey stats
   * @returns {Promise.<[]>}
   */
  getUserJourneyStats: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('learnersAdapter')
        .getUserJourneyStats()
        .then(function(response) {
          resolve(Ember.Object.create(response));
        }, reject);
    });
  },

  /**
   * Get user  competency  stats
   * @returns {Promise.<[]>}
   */
  getUserCompetencyStats: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('learnersAdapter')
        .getUserCompetencyStats()
        .then(function(response) {
          resolve(Ember.Object.create(response));
        }, reject);
    });
  }

});
