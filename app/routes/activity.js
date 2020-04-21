import Ember from 'ember';
import { hasAccess } from 'admin-dataview/helpers/has-access';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // -------------------------------------------------------------------------
  // Events

  beforeModel() {
    if (!hasAccess(['menu', 'catalog'])) {
      window.location.href = `/${hasAccess(['landingPage'])}`;
    }
  },

  model: function(params) {
    return params;
  },

  setupController: function(controller, model) {
    controller.set('searchTerm', model.term);
    controller.set('selectedFilterItems', controller.getStoredFilterItems());
  },

  resetController: function(controller) {
    controller.set('isComparativeSearch', false);
  }
});
