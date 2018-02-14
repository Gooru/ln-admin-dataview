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
   * It maintains the list of resource data
   * @type {Array}
   */
  resources: Ember.A(),

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    /**
     * Action get triggered when card got clicked
     * @param  {Object} resource
     */
    //onClickCard: function(resource) {

    //}
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    let route = this;
    return Ember.RSVP.hash({
      resources: route.get('searchService').searchResources('water')
    });
  },


  setupController: function(controller, model) {
    controller.set('resources', model.resources);
  }

});
