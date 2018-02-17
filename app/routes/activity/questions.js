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
    let questionFilters = Object.assign(filters, appliedFilters);
    return Ember.RSVP.hash({
      questions: route.get('searchService').searchQuestions(term, questionFilters, offset, pageSize)
    });
  },


  setupController: function(controller, model) {
    controller.set('questions', model.questions.get('searchResults'));
    controller.set('hitCount', model.questions.get('hitCount'));
    controller.set('OFFSET', model.questions.get('searchResults').length);
  }

});
