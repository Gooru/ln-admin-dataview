import Ember from 'ember';
import { hasAccess } from 'admin-dataview/helpers/has-access';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onMenuItemSelection(item) {
      if (item === 'competency-map') {
        window.location.href = '/competency/competency-map';
      } else {
        this.transitionTo(`competency.${item}`);
      }
    }
  },

  beforeModel() {
    if (!hasAccess(['menu', 'competency'])) {
      window.location.href = `/${hasAccess(['landingPage'])}`;
    }
  }
});
