import Ember from 'ember';
import CrosswalkAdapter from 'admin-dataview/adapters/crosswalk/crosswalk';
import CrosswalkSerializer from 'admin-dataview/serializers/crosswalk/crosswalk';

/**
 * Service to support the operation for crosswalkService
 *
 * @typedef {Object} crosswalkService
 */

export default Ember.Service.extend({
  crosswalkAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'crosswalkAdapter',
      CrosswalkAdapter.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'crosswalkSerializer',
      CrosswalkSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * @param subjectId
   * Method to fetch crosswalk data
   */

  getCrosswalkData: function(id, subjectId, isIncludeMicro) {
    let service = this;
    let crosswalkSerializer = service.get('crosswalkSerializer');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('crosswalkAdapter')
        .getCrosswalkData(id, subjectId, isIncludeMicro)
        .then(function(response) {
          resolve(
            crosswalkSerializer.normalizeCrosswalkCompetencyData(id, response)
          );
        }, reject);
    });
  }
});
