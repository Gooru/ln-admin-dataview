import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Properties

  /**
   * User id of the learner
   * @type {String}
   */
  userId: null,

  /**
   * data of the learner
   * @type {Array}
   */
  data: null,

  //------------------------------------------------------------------------
  // Events

  actions: {

    onClickBackButton: function() {
      this.transitionToRoute('learner', this.get('userId'));
    }
  }


});
