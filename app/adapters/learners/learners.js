import Ember from 'ember';

/**
 * Adapter to support the Lookup API 3.0 integration
 *
 * @typedef {Object} LookupAdapter
 */
export default Ember.Object.extend({

  namespace: '/stubs',

  /**
   * Get learners profile distribution
   * @returns {Promise.<[]>}
   */
  getLearnerProfileDistribution: function() {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/stats/learners-location-based-count.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
    };
    return Ember.RSVP.hashSettled({
      locationBasedCount: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.locationBasedCount.value;
    });
  },

  /**
   * Get user stats content count
   * @returns {Promise.<[]>}
   */
  getUserStatsContent: function() {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/stats/user-stats-content.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
    };
    return Ember.RSVP.hashSettled({
      userStatsContent: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userStatsContent.value;
    });
  },

  /**
   * Get user stats by courses
   * @returns {Promise.<[]>}
   */
  getUserStatsByCourse: function() {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/stats/user-stats-by-course.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
    };
    return Ember.RSVP.hashSettled({
      userStatsByCourse: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userStatsByCourse.value;
    });
  },

  /**
   * Get user  journey stats
   * @returns {Promise.<[]>}
   */
  getUserJourneyStats: function() {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/stats/user-stats-journey.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
    };
    return Ember.RSVP.hashSettled({
      userJourneyStats: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userJourneyStats.value;
    });
  },

  /**
   * Get user  competency  stats
   * @returns {Promise.<[]>}
   */
  getUserCompetencyStats: function() {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/stats/user-stats-competency.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
    };
    return Ember.RSVP.hashSettled({
      userCompetencyStats: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userCompetencyStats.value;
    });
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
