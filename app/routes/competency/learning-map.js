import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  /**
   * @requires taxonomyService
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  model() {
    return this.get('taxonomyService')
      .fetchTaxonomyClassifications()
      .then(classifications => {
        let defaultCategory =
          classifications.findBy('isDefault', true) || classifications[0];
        return this.get('taxonomyService')
          .fetchSubjects(defaultCategory.get('id'))
          .then(subject => {
            let defaultSubject =
              subject.findBy('isDefault', true) || subject[0];
            let fwIds = defaultSubject.get('frameworks');
            let defaultfwId = fwIds.find(fw => fw.isDefault)
              ? fwIds.find(fw => fw.isDefault).frameworkId
              : 'GDT';
            return this.get('taxonomyService')
              .fetchCourses(defaultfwId, defaultSubject.get('id'))
              .then(courses => {
                let defaultCourse =
                  courses.findBy('isDefault', true) || courses[0];

                return {
                  categoryList: classifications,
                  defaultCategory,
                  defaultSubject,
                  defaultCourse
                };
              });
          });
      });
  },

  setupController(controller, model) {
    let dataLevels = Ember.Object.create({
      subjectClassification: model.defaultCategory.get('id'),
      subjectCode: model.defaultSubject.get('id'),
      courseCode: model.defaultCourse ? model.defaultCourse.get('id') : ''
    });
    controller.set('dataLevels', dataLevels);
    let selectedDataLevelItems = Ember.Object.create({
      category: model.defaultCategory.get('title'),
      subject: model.defaultSubject.get('title'),
      course: model.defaultCourse ? model.defaultCourse.get('title') : ''
    });
    controller.set('selectedDataLevelItems', selectedDataLevelItems);
    controller.set('categoryList', model.categoryList);
    controller.fetchLearningMapCompetency();
  }
});
