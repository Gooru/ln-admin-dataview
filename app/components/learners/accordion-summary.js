import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['learners', 'accordion-summary'],


  classNameBindings: ['isExpanded:expanded'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} go live action name
   */
  count: 0,

  /**
   * Data of competencies count
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
          this.$(`#${this.get('updateElementId')}-heading > .panel-title a`).click();
          this.set('updateElementId', this.get('elementId'));

        } else {
          this.set('updateElementId', this.get('elementId'));
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // Events

  // setupComponent: Ember.on('didInsertElement', function() {
  //   const component = this;
  //
  //   this.$().on('hide.bs.collapse', function(e) {
  //     e.stopPropagation();
  //     component.set('isExpanded', false);
  //   });
  //
  //   this.$().on('show.bs.collapse', function(e) {
  //     e.stopPropagation();
  //     component.set('isExpanded', true);
  //   });
  //
  // }),
  //
  // removeSubscriptions: Ember.on('willDestroyElement', function() {
  //   this.$().off('hide.bs.collapse');
  //   this.$().off('show.bs.collapse');
  // })

});
