import Ember from 'ember';
import User from 'admin-dataview/models/auth/sign-in';
import Env from 'admin-dataview/config/environment';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} Session
   */
  session: Ember.inject.service(),

  /**
   * @property {Service} Session service
   */
  sessionService: Ember.inject.service('api-sdk/session'),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    signIn: function() {
      const controller = this;
      const user = controller.get('user');
      const errorMessage = controller
        .get('i18n')
        .t('signIn.errors.credentials_not_valid').string;

      controller.get('notifications').clear();
      controller.get('notifications').setOptions({
        positionClass: 'toast-top-full-width sign-in'
      });

      if (!controller.get('session.isAuthenticated')) {
        if (controller.get('didValidate') === false) {
          var username = Ember.$('.app-input.username input').val();
          var password = Ember.$('.app-input.password input').val();
          user.set('username', username);
          user.set('password', password);
        }
        user.validate().then(function({ validations }) {
          if (validations.get('isValid')) {
            controller
              .get('sessionService')
              .authenticateUsingCredentials(user)
              .then(
                function() {
                  controller.set('didValidate', true);
                  controller.transitionTo('competency.tree');
                },
                function() {
                  controller.get('notifications').warning(errorMessage);
                }
              );
          }
        });
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * init and reset all the properties for the validations
   */

  resetProperties() {
    var controller = this;
    var user = User.create(Ember.getOwner(this).ownerInjection(), {
      username: null,
      password: null
    });
    controller.set('user', user);
    const url = `${window.location.protocol}//${window.location.host}${
      Env['google-sign-in'].url
    }`;
    controller.set('googleSignInUrl', url);
    controller.set('didValidate', false);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {User} user
   */
  user: null,

  target: null,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false
});
