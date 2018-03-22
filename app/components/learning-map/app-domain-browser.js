import Ember from 'ember';
import {
  COMPETENCY_LEARNING_MAP_DATA_LEVELS,
  TAXONOMY_CATEGORIES
} from 'admin-dataview/config/config';

export default Ember.Component.extend({
  classNames: ['learning-map', 'app-domain-browser'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Search service to fetch content details
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  dataLevels: COMPETENCY_LEARNING_MAP_DATA_LEVELS,

  categories: TAXONOMY_CATEGORIES,

  subjects: [],

  courses: [],

  domains: [],

  dataLevelItesms: [],

  defaultFramework: 'GDT',

  selectedCategory: 'k_12',

  selectedSubject: null,

  selectedCourse: null,

  domainStack: [],

  init() {
    let component = this;
    let selectedCategory = component.get('selectedCategory');
    let initialSubject = component.fetchSubjectsByCategory(selectedCategory);
    initialSubject.then(function(subject) {
      if (!subject.frameworkId) {
        subject.frameworkId = component.get('defaultFramework');
      }
      component.set('selectedSubject', subject);
      let initialCourse = component.fetchCoursesBySubject(subject);
      initialCourse.then(function(course) {
        component.set('selectedCourse', course);
        subject.courses = component.get('courses');
        component.fetchDomainsByCourse(subject, course);
      });
    });
  },

  fetchSubjectsByCategory(category) {
    let component = this;
    const subjectsPromise = Ember.RSVP.resolve(
      component.get('taxonomyService').getSubjects(category)
    );
    return Ember.RSVP.hash({
      subjectList: subjectsPromise
    }).then(function(hash) {
      component.set('subjects', hash.subjectList);
      return hash.subjectList[0];
    });
  },

  fetchCoursesBySubject(subject) {
    let component = this;
    const coursePromise = Ember.RSVP.resolve(
      component.get('taxonomyService').getCoursesBySubject(subject)
    );
    return Ember.RSVP.hash({
      courseList: coursePromise
    }).then(function(hash) {
      component.set('courses', hash.courseList);
      return hash.courseList[0];
    });
  },

  fetchDomainsByCourse(subject, course) {
    let component = this;
    const domainPromise = Ember.RSVP.resolve(
      component.get('taxonomyService').getCourseDomains(subject, course.id)
    );
    return Ember.RSVP.hash({
      domainList: domainPromise
    }).then(function(hash) {
      component.set('domains', hash.domainList);
    });
  }
});
