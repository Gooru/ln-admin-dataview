import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['comparative-search-resource-accordian'],

  // ----------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} activity hold the single activity details
   */
  activity: null,

  /**
   * @property {Boolean} isExpanded controll the eye icon to arrow up
   */
  isExpanded: false,

  // ---------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action trigger when click collection or assessment
     */
    onToggleActivity() {
      let component = this;
      component.toggleProperty('isExpanded');
      component
        .$('.comparative-gooru-resource-accordian-panel')
        .slideToggle(500);
    }
  }
});
