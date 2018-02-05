import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes


  classNames: ['activities-pull-out-more-content'],


  // -------------------------------------------------------------------------
  // actions

  actions: {
    onheaderClick: function(header) {
      this.sendAction('onClickHeader', header);
    }


  }

});
