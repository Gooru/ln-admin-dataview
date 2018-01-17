import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:profile
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  //------------------------------------------------------------------------
  //Properties


  //------------------------------------------------------------------------
  //Methods

  model: function(params) {
    return Ember.RSVP.hash({
      userProfile: this.get('profileService').getUserProfile(params.userId),
      userGrades: this.get('profileService').getUserGrades(params.userId),
      userPrefsCurators: this.get('profileService').getUserPrefsCurators(params.userId),
      userPrefsProviders: this.get('profileService').getUserPrefsProviders(params.userId),
      userPrefsContent: this.get('profileService').getUserPrefsContent(params.userId)
    });
  },

  setupController: function(controller, model) {
    controller.set('userId', model.userProfile.userId);
    controller.set('user', model.userProfile);
  }

});
