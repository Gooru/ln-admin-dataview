import Ember from 'ember';

/**
 * Adapter to support the Learner API's
 *
 * @typedef {Object} LookupAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/ds/users',

  /**
   * Get learners profile distribution
   * @returns {Promise.<[]>}
   */
  getLearnerProfileDistribution: function(subjectId, activeDuration='3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/user/distribution`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data:{subjectId:subjectId,zoom:1,activeDuration:activeDuration}
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
  getUserStatsContent: function(userId, activeDuration='3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/user/stats/contents`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId, activeDuration:activeDuration}
    };
    return Ember.RSVP.hashSettled({
      userStatsContent: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userStatsContent.value;
    });
  },

  /**
   * Get user stats content count
   * @returns {Promise.<[]>}
   */
  getUserStatsContentByType: function(userId, contentType, activeDuration='3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/user/stats/resources`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId, contentType: contentType, activeDuration:activeDuration}
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
  getUserStatsByCourse: function(userId, activeDuration='3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/user/stats/courses`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId, activeDuration:activeDuration}
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
  getUserJourneyStats: function(userId, activeDuration='3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/user/stats/journeys`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId, activeDuration:activeDuration}
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
  getUserCompetencyStats: function(userId, activeDuration='3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/user/stats/competency`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId, activeDuration:activeDuration}
    };
    return Ember.RSVP.hashSettled({
      userCompetencyStats: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userCompetencyStats.value;
    });
  },

  /**
   * Get active user distribution by subject
   * @returns {Promise.<[]>}
   */
  getActiveUserDistrbutionBySubject: function(subjectId, activeDuration='3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/user/distribution/active`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {subject: subjectId, activeDuration:activeDuration}
    };
    return Ember.RSVP.hashSettled({
      activeUserDistrbutionBySubject: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.activeUserDistrbutionBySubject.value;
    });
  },

  /**
   * Get user stats content count
   * @returns {Promise.<[]>}
   */
  getUserTimeSpentStats: function(userId, activeDuration='3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/user/stats/timespent`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId, activeDuration:activeDuration}
    };
    return Ember.RSVP.hashSettled({
      userTimeSpentStats: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userTimeSpentStats.value;
    });
  },


  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
