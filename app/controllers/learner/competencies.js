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
   * data of the learner
   * @type {Array}
   */
  data: null,

  /**
   * Indicates which mode currently Enabled
   * @type {Boolean}
   */
  isGridModeEnabled: false,

  //------------------------------------------------------------------------
  // Events

  actions: {

    onClickBackButton: function() {
      this.transitionToRoute('learner');
    },

    onChooseListView: function() {
      this.set('isGridModeEnabled', false);
    },

    onChooseGridView: function() {
      this.set('isGridModeEnabled', true);
    }
  }


});
