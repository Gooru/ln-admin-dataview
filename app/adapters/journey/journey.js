import Ember from 'ember';

/**
 * Adapter to support the Journey API
 *
 * @typedef {Object} JourneyAdapter
 */
export default Ember.Object.extend({

  namespace: '/stubs',

  /**
   * Get journey of user taken (courses and IL's courses)
   * @returns {Promise.<[]>}
   */
  getUserJourneyByCourses: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/journey/journey-by-courses-${userId}.json`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.RSVP.hashSettled({
      userJourneyByCourses: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userJourneyByCourses.value;
    });
  },


  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
