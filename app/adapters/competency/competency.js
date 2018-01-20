import Ember from 'ember';

/**
 * Adapter to support the Competency API
 *
 * @typedef {Object} CompetencyAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/ds/users',

  /**
   * Get user  competency  summary report
   * @returns {Promise.<[]>}
   */
  getUserCompetencySummary: function(user, competencyCode) {
    const adapter = this;
    //const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}/stubs/stats/user-competencies-accordion-summary.json`;
    //const url =`${namespace}/v1/user/performance/competency/collections`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        user,
        competencyCode
      }
    };
    return Ember.RSVP.hashSettled({
      userCompetencySummary: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userCompetencySummary.value;
    });
  },


  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }

});
