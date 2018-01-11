import Ember from 'ember';
import AuthenticationAdapter from 'admin-dataview/adapters/countries/countries';

/**
 * Service for the countries
 *
 * @typedef {Object} countriesService
 */
export default Ember.Service.extend({

  countriesAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set('countriesAdapter', AuthenticationAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Fetch the countries data
   * @returns {Object}
   */
  getCountries: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('countriesAdapter')
        .getCountries()
        .then(function(response) {
          resolve(response);
        }, reject);
    });
  }

});
