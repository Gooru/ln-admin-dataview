import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['global-statistics'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {visibleTableView}
   */
  visibleTableView: false,

  /**
   * @property {visibleboxView}
   */
  visibleBoxView: true,


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     *  table view actions
     * @param {string} code
     */
    viewTable: function() {
      this.set('visibleBoxView', false);
      this.set('visibleTableView', true);
    },

    /**
     *  aacktable view actions
     * @param {string} code
     */
    viewBox: function() {
      this.set('visibleBoxView', true);
      this.set('visibleTableView', false);

    }


  }

});
