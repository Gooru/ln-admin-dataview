import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  //-------------------------------------------------------------------------
  //Properties


  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    let route = this;
    let term = params.term ? params.term : '*';
    let filters = {
      'flt.publishStatus': 'published'
    };
    let offset = 1;
    let pageSize = 8;
    let appliedFilters = route.controllerFor('activity').getAppliedFilters();
    let resourceFilters = Object.assign(filters, appliedFilters);
    return Ember.RSVP.hash({
      resources: route.get('searchService').searchResources(term, resourceFilters, offset, pageSize)
    });
  },


  setupController: function(controller, model) {
    controller.set('resources', model.resources.get('searchResults'));
    controller.set('hitCount', model.resources.get('hitCount'));
    controller.set('OFFSET', model.resources.get('searchResults').length);
  }

});
