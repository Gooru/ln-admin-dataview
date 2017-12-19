import Ember from 'ember';
import ConfigurationMixin from 'admin-dataview/mixins/configuration';

/**
 * Serializer to support Search functionality
 *
 * @typedef {Object} SearchSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  init: function() {
    this._super(...arguments);
  },

  /**
   * Normalize the Search response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {contentCount}
   */
  normalizeSearchContentCount: function(payload) {
    let totalHitCount = payload ? payload.totalHitCount : null;
    return totalHitCount;
  }

});
