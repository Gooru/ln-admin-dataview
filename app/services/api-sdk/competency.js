import Ember from 'ember';
import CompetencyAdapter from 'admin-dataview/adapters/competency/competency';
import CompetencySerializer from 'admin-dataview/serializers/competency/competency';
/**
 * Service for the competency
 *
 * @typedef {Object} competencyService
 */
export default Ember.Service.extend({

  competencyAdapter: null,

  competencySerializer: null,

  init: function() {
    this._super(...arguments);
    this.set('competencyAdapter', CompetencyAdapter.create(Ember.getOwner(this).ownerInjection()));
    this.set('competencySerializer', CompetencySerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Get user competency summary
   * @returns {Promise.<[]>}
   */
  getUserCompetencySummary: function(userId, competencyCode) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('competencyAdapter')
        .getUserCompetencySummary(userId, competencyCode)
        .then(function(response) {
          resolve(service.get('competencySerializer').normalizeUserCompetencySummary(response));
        }, reject);
    });
  }

});
