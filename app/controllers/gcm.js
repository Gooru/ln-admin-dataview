import Ember from 'ember';

export default Ember.Controller.extend({


  showPullOut: false,

  actions: {
    /**
     * Action triggered when the event open the pull out.
     */
    onPullOutOpen: function() {
      this.set('showPullOut', true);
    },

    /**
     * Action triggered when the event close the pull out .
     */
    onPullOutClose: function() {
      this.set('showPullOut', false);
    }
  }
});
