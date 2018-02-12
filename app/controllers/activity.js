import Ember from 'ember';
import {
  ACTIVITY_FILTER
} from 'admin-dataview/config/config';

export default Ember.Controller.extend({


  // -------------------------------------------------------------------------
  // Properties

  filterTypes: ACTIVITY_FILTER,


  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onMenuItemSelection(item) {
      let routeTo = `activity.${  item}`;
      this.transitionToRoute(routeTo);
    }
  }

});
