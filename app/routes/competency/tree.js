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

  defaultFrameworkId: 'GDT',

  /**
   * categories list of taxonomy
   * @return {Object}
   */
  categories: Ember.A([]),

  dataLoadCount: 0,

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    return this.loadTaxonomyData();
  },

  loadTaxonomyData: function() {
    let route = this;
    return Ember.RSVP.hash({
      subjects: this.get('taxonomyService').getSubjects()
    }).then(() => {
      let promises = Ember.A();
      let categories = this.get('categories');
      let classifications = this.get('taxonomyService').get(
        'taxonomyClassificationsContainer'
      );
      classifications.forEach(classification => {
        let classificationId = classification.get('id');
        let title = classification.get('title');
        let code = classification.get('code');
        let category = this.createCategory(classificationId, title, code);
        this.get('taxonomyService')
          .getSubjects(classificationId)
          .then(subjects => {
            subjects.forEach(subject => {
              if (!subject.get('frameworkId')) {
                subject.set('frameworkId', route.get('defaultFrameworkId'));
              }
            });
            category.set('subjects', subjects);
          });
        categories.pushObject(category);
      });
      return Ember.RSVP.all(promises).then(function() {
        return Ember.RSVP.hash({
          categories: categories
        });
      });
    });
  },

  setupController: function(controller, model) {
    let data = Ember.Object.create({
      name: 'Gooru',
      type: 'root',
      id: 'GDT',
      children: Ember.A()
    });
    controller.set('taxonomyTreeViewData', data);
    controller.set('categories', model.categories);
    let dataLoadCount = controller.get('dataLoadCount') + 1;
    controller.set('dataLoadCount', dataLoadCount);
  },

  createCategory(id, title, code) {
    return Ember.Object.create({
      title: title,
      type: 'category',
      id: id,
      code: code,
      subjects: Ember.A()
    });
  }
});
