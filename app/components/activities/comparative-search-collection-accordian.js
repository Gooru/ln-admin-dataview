import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['comparative-search-collection-accordian'],

  // ----------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} activity hold the single activity details
   */
  activity: null,

  // ---------------------------------------------------------------------
  // Actions

  actions: {
    onToggleActivity() {
      let component = this;
      component
        .$('.comparative-gooru-collection-accordian-panel')
        .slideToggle(500);
    }
  }
});
