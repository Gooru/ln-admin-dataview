import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Search service to fetch content details
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  model() {
    return Ember.RSVP.hash({
      categories: this.get('taxonomyService').getTaxonomyClassifications()
    });
  },

  //Methods
  //-------------------------------------------------------------------------

  setupController: function(controller, model) {
    controller.set('enableGenerateTableBtn', false);
    controller.set('showCrosswalkTable', false);
    controller.set('showSubjectBrowser', true);
    controller.set('selectedFrameworks', []);
    controller.set('categories', model.categories);
  }
});
