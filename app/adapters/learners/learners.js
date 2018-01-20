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
  getLearnerProfileDistribution: function(subjectId) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    //const url = `/${namespace}/v1/user/distribution`;
    const url = `${basePath}/stubs/stats/learners-location-based-count-${subjectId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data:{subjectId:subjectId,zoom:1}
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
  getUserStatsContent: function(userId) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}/stubs/stats/user-stats-content.json`;
    //const url = `${namespace}/v1/user/stats/contents`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId}
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
  getUserStatsByCourse: function(userId) {
    const adapter = this;
    //  const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}/stubs/stats/user-stats-by-course.json`;
    //const url = `${namespace}/v1/user/stats/courses`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId}
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
  getUserJourneyStats: function(userId) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}/stubs/stats/user-stats-journey.json`;
    //const url = `${namespace}/v1/user/stats/journeys`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId}
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
  getUserCompetencyStats: function(userId) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}/stubs/stats/user-stats-competency.json`;
    //const url = `${namespace}/v1/user/stats/competency`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {user: userId}
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
  getActiveUserDistrbutionBySubject: function(subjectId) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    //const url = `/${namespace}/v1/user/distribution/active`;
    const url = `${basePath}/stubs/stats/active-user-distrbution-by-subject-${subjectId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {subject: subjectId}
    };
    return Ember.RSVP.hashSettled({
      activeUserDistrbutionBySubject: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.activeUserDistrbutionBySubject.value;
    });
  },


  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
