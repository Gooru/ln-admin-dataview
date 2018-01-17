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
      userProfile: this.get('profileService').getUserProfile(params.userId)
    });
  },

  setupController: function(controller, model) {
    controller.set('userId', model.userProfile.userId);
    controller.set('user', model.userProfile);
  }

});
