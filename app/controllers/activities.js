import Ember from 'ember';
import { ACTIVITIES_FILTER } from 'admin-dataview/config/config';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * @function onSearch
     * Action triggered when the user hit enter on the search box
     */
    onSearch: function(term) {
      let controller = this;
      controller.transitionToRoute(`/activities/summary?term=${  term}`);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array}
   * List of filter items supported in the activities modules
   */
  filterTypes: ACTIVITIES_FILTER
});
