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
   * It maintains the list of assessment data
   * @type {Array}
   */
  assessments: Ember.A(),

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    /**
     * Action get triggered when card got clicked
     * @param  {Object} assessment
     */
    //onClickCard: function(assessment) {

    //}
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    let route = this;
    return Ember.RSVP.hash({
      assessments: route.get('searchService').searchAssessments('water')
    });
  },


  setupController: function(controller, model) {
    controller.set('assessments', model.assessments.get('searchResults'));
    controller.set('hitCount', model.assessments.get('hitCount'));
  }

});
