import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['learners', 'accordion-summary'],


  classNameBindings: ['isExpanded:expanded'],

  // -------------------------------------------------------------------------
  // Properties


  /**
   * Data of competencies competencies data summary
   * @return {Array}
   */
  data: null,


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectCompetency: function() {
      let count = 0;
      if (this.get('updateElementId') === this.get('elementId')) {
        count = count + 1;
      } else {
        if (count > 0) {
          this.$(`#${this.get('updateElementId')}-heading > .panel-title a i`).click();
          this.set('updateElementId', this.get('elementId'));

        } else {
          this.set('updateElementId', this.get('elementId'));
        }
      }
    }
    // this.sendAction('onClickBackButton');
  }

  // -------------------------------------------------------------------------
  // Events

});
