import Ember from 'ember';

/**
 * Adapter to support the Lookup API 3.0 integration
 *
 * @typedef {Object} LookupAdapter
 */
export default Ember.Object.extend({

  namespace: '/stubs',

  /**
   * Get learners country location based count
   * @returns {Promise.<[]>}
   */
  getLearnersLocationBasedCount: function() {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const basePath = (`${window.location.protocol  }//${  window.location.host}`);
    const url = `${basePath}${namespace}/learners-location-based-count.json`;
    const options = {
      type: 'GET'
    };
    return Ember.RSVP.hashSettled({
      locationBasedCount: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.locationBasedCount.value;
    });
  }

});
