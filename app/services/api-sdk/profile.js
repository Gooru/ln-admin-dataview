import Ember from 'ember';
import ProfileSerializer from 'admin-dataview/serializers/profile/profile';
import ProfileAdapter from 'admin-dataview/adapters/profile/profile';

/**
 * Service to support the Profile
 *
 * @typedef {Object} ProfileService
 */
export default Ember.Service.extend({

  /**
   * profile Serializer
   * @type {Object}
   */
  profileSerializer: null,

  /**
   * profile Adapter
   * @type {Object}
   */
  profileAdapter: null,

  /**
   * Intialize profile serializer  and adapter
   */
  init: function() {
    this._super(...arguments);
    this.set(
      'profileSerializer',
      ProfileSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'profileAdapter',
      ProfileAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Gets the user Profile information of a given user id
   *
   * @returns {Promise}
   */
  readUserProfile: function(userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.readMultipleProfiles([userId]).then(function(profiles) {
        resolve(profiles.length ? profiles[0] : undefined);
      }, reject);
    });
  },

  /**
   * Gets the user Profile information of a given username
   *
   * @returns {Promise}
   */
  readUserProfileByUsername: function(username) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').readUserProfileByUsername(username).then(
        function(response) {
          resolve(
            service.get('profileSerializer').normalizeReadProfile(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },

  readMultipleProfiles: function(profileIds, max = 30) {
    const service = this;
    var chunk = profileIds.length > max ? max : profileIds.length;
    const promises = [];
    var usersProfile = Ember.A([]);

    return new Ember.RSVP.Promise(function(resolve, reject) {
      for (let i = 0, j = profileIds.length; i < j; i += chunk) {
        let temparray = profileIds.slice(i, i + chunk);
        const promise = service
          .get('profileAdapter')
          .readMultipleProfiles(temparray);
        promises.push(promise);
      }
      Ember.RSVP.all(promises).then(
        function(values) {
          values.forEach(function(value) {
            usersProfile.addObjects(
              service
                .get('profileSerializer')
                .normalizeReadMultipleProfiles(value)
            );
          });

          resolve(usersProfile);
        },
        function(error) {
          reject(error);
        }
      );
    });
  }

});
