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
    let assessmentFilters = Object.assign(filters, appliedFilters);
    return Ember.RSVP.hash({
      assessments: route.get('searchService').searchAssessments(term, assessmentFilters, offset, pageSize)
    });
  },


  setupController: function(controller, model) {
    controller.set('assessments', model.assessments.get('searchResults'));
    controller.set('hitCount', model.assessments.get('hitCount'));
    controller.set('OFFSET', model.assessments.get('searchResults').length);
  }

});
