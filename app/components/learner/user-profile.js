import Ember from 'ember';

export default Ember.Component.extend({

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['user-profile-view-container'],

  actions: {
    onToggleUserProfilePopup: function() {
      this.sendAction('onToggleUserProfilePopup');
    }
  }

});
