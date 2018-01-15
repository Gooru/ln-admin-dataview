import Ember from 'ember';

export default Ember.Controller.extend({

  // --------------------------------------------------------------------------
  // Query params

  // --------------------------------------------------------------------------
  // Actions

  actions:  {
    onMenuItemSelection: function(item) {
      this.transitionToRoute(item.label, this.get('userId'));
    }
  }

  // --------------------------------------------------------------------------
  // Properties


});
