import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'signIn.errors.add_username'
      })
    ]
  },

  password: [
    validator('presence', {
      presence: true,
      message: '{{description}}',
      descriptionKey: 'signIn.errors.password_required'
    })
  ]
});

/**
 * Profile model with the user account information
 *
 * @typedef {Object} ProfileModel
 */
export default Ember.Object.extend(Validations, {
  /**
   * @property {string} username - The profile username
   */
  username: null,

  /**
   * @property {string} password  - The profile password
   */
  password: null
});
