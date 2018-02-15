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
    return Ember.RSVP.hash({
      resources: route.get('searchService').searchResources(term, filters)
    });
  },


  setupController: function(controller, model) {
    controller.set('resources', model.resources.get('searchResults'));
    controller.set('hitCount', model.resources.get('hitCount'));
  }

});
