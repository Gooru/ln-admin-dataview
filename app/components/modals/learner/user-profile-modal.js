import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * @requires service:profile
   */
  profileService: Ember.inject.service('api-sdk/profile'),
  // --------------------------------------------------------------------------
  // Attributes

  classNames: ['user-profile-modal'],

  citizenship: 0,

  authority: 0,

  reputation: 0,

  userGrades: [],

  userProfile: [],

  userPrefsCurators: [],

  userPrefsProviders: [],

  userPrefsContent: [],

  init: function() {
    let component = this;
    component._super(...arguments);
    let user = component.get('model.user');
    console.log('user', user);
    component.set('citizenship', user.citizenship);
    component.set('authority', user.authority);
    component.set('reputation', user.reputation);
    let userId = user.userId;
    return Ember.RSVP.hash({
      userGrades: this.get('profileService').getUserGrades(userId),
      userPrefsCurators: this.get('profileService').getUserPrefsCurators(userId),
      userPrefsProviders: this.get('profileService').getUserPrefsProviders(userId),
      userPrefsContent: this.get('profileService').getUserPrefsContent(userId)
    }).then(function(hash) {
      console.log('hash', hash);
      component.set('userProfile', user);
      component.set('userGrades', hash.userGrades);
      component.set('userPrefsContent', hash.userPrefsContent);
      component.set('userPrefsProviders', hash.userPrefsProviders);
      component.set('userPrefsCurators', hash.userPrefsCurators);
    });

  },

  didInsertElement: function() {
    var acc = this.$(".accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
  }

});
