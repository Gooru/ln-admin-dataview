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
    let offset = 1;
    let pageSize = 8;
    let filters = {'flt.publishStatus': 'published'};
    let appliedFilters = route.controllerFor('activity').getAppliedFilters();
    let collectionFilters = Object.assign(filters, appliedFilters);
    return Ember.RSVP.hash({
      collections: route.get('searchService').searchCollections(term, collectionFilters, offset, pageSize)
    });
  },


  setupController: function(controller, model) {
    controller.set('collections', model.collections.get('searchResults'));
    controller.set('hitCount', model.collections.get('hitCount'));
    controller.set('OFFSET', model.collections.get('searchResults').length);
  }

});
