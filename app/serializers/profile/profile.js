import Ember from 'ember';
import ProfileModel from 'admin-dataview/models/profile/profile';
import ConfigurationMixin from 'admin-dataview/mixins/configuration';
import {DEFAULT_IMAGES} from 'admin-dataview/config/config';


/**
 * Serializer to support the Profile CRUD operations for API 3.0
 *
 * @typedef {Object} ProfileSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {

  session: Ember.inject.service('session'),

  /**
   * Normalize the Read Profile endpoint response
   * @param payload is the endpoint response in JSON format
   * @returns {ProfileModel} a profile model object
   */
  normalizeReadProfile: function(payload) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.user');
    const appRootPath = this.get('appRootPath');
    const thumbnailUrl = payload.thumbnail ?
      basePath + payload.thumbnail :
      appRootPath + DEFAULT_IMAGES.USER_PROFILE;

    return ProfileModel.create(Ember.getOwner(this).ownerInjection(), {
      id: payload.id,
      firstName: payload.first_name,
      lastName: payload.last_name,
      username: payload.username,
      email: payload.email,
      gender: payload.gender,
      grades: payload.grade,
      dateOfBirth: payload.birth_date,
      role: payload.user_category,
      createdAt: payload.created_at,
      lastUpdate: payload.updated_at,
      countryId: payload.country_id,
      country: payload.country,
      stateId: payload.state_id,
      state: payload.state,
      studentId: payload.roster_global_userid,
      schoolDistrictId: payload.school_district_id,
      schoolDistrict: payload.school_district,
      aboutMe: payload.about,
      avatarUrl: thumbnailUrl,
      rosterId: payload.roster_id,
      followers: payload.followers,
      followings: payload.followings,
      isFollowing: !!payload.isFollowing
    });
  },

  /**
   * Normalizes multiple profile items information
   * @param { users: [] } payload
   * @returns {ProfileModel[]}
   */
  normalizeReadMultipleProfiles: function(payload) {
    const serializer = this;
    let profiles = Ember.A([]);
    if (payload.users) {
      profiles = payload.users.map(function(userPayload) {
        return serializer.normalizeReadProfile(userPayload);
      });
    }
    return profiles;
  }

});
