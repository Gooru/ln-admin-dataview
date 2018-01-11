import Ember from 'ember';
import LearnersAdapter from 'admin-dataview/adapters/learners/learners';

/**
 * Service for the learners
 *
 * @typedef {Object} learnersService
 */
export default Ember.Service.extend({

  learnersAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set('learnersAdapter', LearnersAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Fetch the learners location based count
   * @returns {Object}
   */
  getLearnersLocationBasedCount: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('learnersAdapter')
        .getLearnersLocationBasedCount()
        .then(function(response) {
          let result = Ember.A();
          response.forEach(data => {
            result.pushObject(Ember.Object.create(data));
          });
          resolve(result);
        }, reject);
    });
  }

});
