import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Search service to fetch content details
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  taxonomyDataService: Ember.inject.service('api-sdk/taxonomy'),

  model() {
    return Ember.RSVP.hash({
      categories: this.get('taxonomyService').getTaxonomyClassifications()
    }).then(hash => {
      let defaultCategory =
        hash.categories.findBy('is_default', true) || hash.categories[0];
      return this.get('taxonomyDataService')
        .fetchSubjects(defaultCategory.id)
        .then(subjects => {
          let defaultSubject =
            subjects.findBy('isDefault', true) || subjects[0];
          let defaultFWId = defaultSubject
            .get('frameworks')
            .find(fw => fw.isDefault)
            ? defaultSubject.get('frameworks').find(fw => fw.isDefault)
              .frameworkId
            : 'GDT';
          return {
            categories: hash.categories,
            defaultCategory,
            defaultSubject,
            defaultFWId
          };
        });
    });
  },

  //Methods
  //-------------------------------------------------------------------------

  setupController: function(controller, model) {
    controller.set('enableGenerateTableBtn', false);
    controller.set('showCrosswalkTable', false);
    controller.set('showSubjectBrowser', true);
    controller.set('categoryId', model.defaultCategory);
    controller.set('defaultSubject', model.defaultSubject);
    controller.set('selectedFrameworks', []);
    controller.set('categories', model.categories);
  }
});
