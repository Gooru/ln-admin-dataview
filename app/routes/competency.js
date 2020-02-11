import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onMenuItemSelection(item) {
      if (item === 'competency-map') {
        window.location.href = '/research/competency/competency-map';
      } else {
        this.transitionTo(`competency.${item}`);
      }
    }
  }
});
