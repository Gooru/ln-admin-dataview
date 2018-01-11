import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  //-------------------------------------------------------------------------
  //Properties

  selectedCategory: 'k_12',

  defaultFrameworkId: 'GDT',


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action get triggered when subject category is choosen
     * @param  {Object} category
     */
    chooseCategory: function(category) {
      let route = this;
      route.set('selectedCategory', category.value);
      return route.loadTaxonomyData().then(({subjects}) => {
        let controller = this.get('controller');
        controller.set('subjects', subjects);
        controller.incrementProperty('reloadCount');
      });
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    return this.loadTaxonomyData();
  },

  loadTaxonomyData: function() {
    let route = this;
    return Ember.RSVP.hash({
      subjects: this.get('taxonomyService').getSubjects(route.get('selectedCategory'))
    }).then(({
      subjects
    }) => {
      let promises = Ember.A();
      subjects.forEach(subject => {
        if (!subject.get('frameworkId')) {
          subject.set('frameworkId', route.get('defaultFrameworkId'));
        }
        promises.pushObject(this.get('taxonomyService').getCourses(subject));
      });
      return Ember.RSVP.all(promises).then(function() {
        return Ember.RSVP.hash({
          subjects: subjects
        });
      });
    });
  },

  setupController: function(controller, model) {
    controller.set('subjects', model.subjects);
  }

});
