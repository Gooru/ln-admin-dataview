import Ember from 'ember';

export default Ember.Controller.extend({
  // --------------------------------------------------------------------------
  // Query params


  actions:  {
    onMenuItemSelection: function(item) {
      this.transitionToRoute(item.label, this.get('userId'));
    }
  }

});
