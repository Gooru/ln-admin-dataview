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

  /**
   * It maintains the list of collection data
   * @type {Array}
   */
  collections: Ember.A(),

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    /**
     * Action get triggered when card got clicked
     * @param  {Object} collection
     */
    //onClickCard: function(collection) {

    //}
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    let route = this;
    let term = params.term ? params.term : '*';
    let filters = {'flt.publishStatus': 'published'};
    return Ember.RSVP.hash({
      collections: route.get('searchService').searchCollections(term, filters)
    });
  },


  setupController: function(controller, model) {
    controller.set('collections', model.collections.get('searchResults'));
    controller.set('hitCount', model.collections.get('hitCount'));
  }

});
