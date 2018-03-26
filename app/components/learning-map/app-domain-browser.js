import Ember from 'ember';
import { TAXONOMY_CATEGORIES } from 'admin-dataview/config/config';

export default Ember.Component.extend({
  classNames: ['learning-map', 'app-domain-browser'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Search service to fetch content details
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  categories: TAXONOMY_CATEGORIES,

  subjects: [],

  courses: [],

  domains: [],

  defaultFramework: 'GDT',

  selectedCategory: 'k_12',

  selectedSubject: null,

  selectedCourse: null,

  domainStack: [],

  init: function() {
    let component = this;
    component._super(...arguments);
    let selectedCategory = component.get('selectedCategory');
    let initialSubject = component.fetchSubjectsByCategory(selectedCategory);
    initialSubject.then(function(subject) {
      let initialCourse = component.fetchCoursesBySubject(subject);
      initialCourse.then(function(course) {
        component.fetchDomainsByCourse(subject, course);
      });
    });
  },

  actions: {
    onSelectDataItem(type, dataItem) {
      let component = this;
      component.fetchContentByType(type, dataItem);
      component.sendAction('onSelectDataItem', type, dataItem);
    },

    onSelectDomain(domainId) {
      let component = this;
      let domainStack = component.get('domainStack');
      if (domainStack.includes(domainId)) {
        let domainIndex = domainStack.indexOf(domainId);
        domainStack.splice(domainIndex, 1);
      } else {
        domainStack.push(domainId);
      }
      component.set('domainStack', domainStack);
      component.sendAction('onSelectDomain', domainStack);
    }
  },

  fetchSubjectsByCategory(category) {
    let component = this;
    component.set('selectedCategory', category);
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
    if (!subject.frameworkId) {
      subject.frameworkId = component.get('defaultFramework');
    }
    component.set('selectedSubject', subject);
    const coursePromise = Ember.RSVP.resolve(
      component.get('taxonomyService').getCourses(subject)
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
    component.set('selectedCourse', course);
    const domainPromise = Ember.RSVP.resolve(
      component.get('taxonomyService').getCourseDomains(subject, course.id)
    );
    return Ember.RSVP.hash({
      domainList: domainPromise
    }).then(function(hash) {
      component.set('domains', hash.domainList);
    });
  },

  fetchContentByType(type, dataItem) {
    let component = this;
    let itemsToReset = [];
    let selectedSubject = component.get('selectedSubject');
    switch (type) {
    case 'category':
      itemsToReset = ['subjects', 'courses', 'domains'];
      component.fetchSubjectsByCategory(dataItem.value);
      break;
    case 'subject':
      itemsToReset = ['courses', 'domains'];
      component.fetchCoursesBySubject(dataItem);
      break;
    case 'course':
      itemsToReset = ['domains', 'domainStack'];
      component.fetchDomainsByCourse(selectedSubject, dataItem);
      break;
    case 'domian':
      break;
    }
    component.resetItems(itemsToReset);
  },

  resetItems(itemsToReset) {
    let component = this;
    itemsToReset.map(item => {
      component.set(`${item}`, []);
    });
  }
});
