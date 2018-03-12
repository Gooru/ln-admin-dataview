import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  //-------------------------------------------------------------------------
  //Properties

  selectedCategory: 'k_12',


  //----------------------------------------------------------------------------
  //Methods

  model: function() {
    let route = this;
    return Ember.RSVP.hash({
      subjects: this.get('taxonomyService').getSubjects(route.get('selectedCategory'))
    });
  },

  setupController: function(controller, model) {
    controller.set('subjects', model.subjects);
  }

});
