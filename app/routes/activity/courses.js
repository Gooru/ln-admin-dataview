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
   * It maintains the list of course data
   * @type {Array}
   */
  courses: Ember.A(),

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    /**
     * Action get triggered when card got clicked
     * @param  {Object} course
     */
    //onClickCard: function(course) {

    //}
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    let route = this;
    let term = params.term ? params.term : '*';
    let filters = {'flt.publishStatus': 'published'};
    return Ember.RSVP.hash({
      courses: route.get('searchService').searchCourses(term, filters)
    });
  },


  setupController: function(controller, model) {
    controller.set('courses', model.courses.get('searchResults'));
    controller.set('hitCount', model.courses.get('hitCount'));
  }

});
