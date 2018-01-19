import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['learners', 'accordion-summary-items'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Data of competencies summaryData
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
    selectCompetencyItems: function() {
      if (this.$(`#${this.get('elementId')}-heading > .panel-title a i`).hasClass('fa-caret-down')) {
        this.$(`#${this.get('elementId')}-heading > .panel-title a i`).addClass('fa-caret-up').removeClass('fa-caret-down');
      } else {
        this.$(`#${this.get('elementId')}-heading > .panel-title a i`).addClass('fa-caret-down').removeClass('fa-caret-up');
      }
    }
  }

});
