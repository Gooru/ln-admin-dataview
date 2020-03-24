import Ember from 'ember';
import resourceAdapter from 'admin-dataview/adapters/resource/resource';
import resoruceSerializer from 'admin-dataview/serializers/resource/resource';

export default Ember.Object.extend({
  resourceAdapter: null,

  resoruceSerializer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'resourceAdapter',
      resourceAdapter.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'resoruceSerializer',
      resoruceSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  fetchTranscript(resourceId) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('resourceAdapter')
        .fetchTranscript(resourceId)
        .then(response => {
          return resolve(
            this.get('resourceSerializer').normalizeTranscript(response)
          );
        }, reject);
    });
  },

  fetchSummary(resourceId) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('resourceAdapter')
        .fetchSummary(resourceId)
        .then(response => {
          return resolve(
            this.get('resourceSerializer').normalizeSummary(response)
          );
        }, reject);
    });
  }
});
