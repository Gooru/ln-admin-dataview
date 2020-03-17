import Ember from 'ember';
import { capitalizeString } from 'admin-dataview/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['learning-map', 'app-domain-browser'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Search service to fetch content details
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement: function() {
    let component = this;
    component._super(...arguments);
    component.set('isInitialIteration', true);
    let selectedCategory = component.get('selectedCategory');
    let defaultSubject = component.fetchSubjectsByCategory(selectedCategory);
    defaultSubject.then(function(subject) {
      let defaultCourse = component.fetchCoursesBySubject(subject);
      defaultCourse.then(function(course) {
        component.fetchDomainsByCourse(subject, course);
      });
    });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when the user select a data item
     */
    onSelectDataItem(type, dataItem) {
      let component = this;
      let selectedType = capitalizeString(type);
      let selectedId = dataItem.id || dataItem.value;
      let selectedItemValue = component.get(`selected${selectedType}`);
      let isAlreadySelectedItem = selectedItemValue
        ? (selectedItemValue.id || selectedItemValue) === selectedId
        : false;
      component.set('isInitialIteration', false);
      if (!isAlreadySelectedItem) {
        component.fetchContentByType(type, dataItem);
        component.sendAction('onSelectDataItem', type, dataItem);
      }
    },

    /**
     * Action triggered when the user select a domain item
     */
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

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchSubjectsByCategory
   * Method to fetch subjects by category
   */
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
      let defaultItem = [];
      if (component.get('isInitialIteration')) {
        let level = 'subject';
        defaultItem = component.getDefaultItemByCode(hash.subjectList, level);
      } else {
        defaultItem = hash.subjectList[0];
      }
      return defaultItem;
    });
  },

  /**
   * @function fetchCoursesBySubject
   * Method to fetch courses by subject
   */
  fetchCoursesBySubject(subject) {
    let component = this;
    subject.frameworkId = subject.get('frameworks').find(fw => fw.isDefault)
      ? subject.get('frameworks').find(fw => fw.isDefault).frameworkId
      : component.get('defaultFramework');
    component.set('selectedSubject', subject);
    const coursePromise = Ember.RSVP.resolve(
      component.get('taxonomyService').getCourses(subject)
    );
    return Ember.RSVP.hash({
      courseList: coursePromise
    }).then(function(hash) {
      let defaultItem = [];
      component.set('courses', hash.courseList);
      if (component.get('isInitialIteration')) {
        let level = 'course';
        defaultItem = component.getDefaultItemByCode(hash.courseList, level);
      } else {
        defaultItem = hash.courseList[0];
      }
      return defaultItem;
    });
  },

  /**
   * @function fetchDomainsByCourse
   * Method to fetch domains by course
   */
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

  /**
   * @function fetchContentByType
   * Method to fetch content by type
   */
  fetchContentByType(type, dataItem) {
    let component = this;
    let itemsToReset = [];
    let id = dataItem.id || dataItem.value;
    let selectedSubject = component.get('selectedSubject');
    switch (type) {
    case 'category':
      itemsToReset = ['subjects', 'courses', 'domains'];
      component.fetchSubjectsByCategory(id);
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

  /**
   * @function resetItems
   * Method to reset property items
   */
  resetItems(itemsToReset) {
    let component = this;
    itemsToReset.map(item => {
      component.set(`${item}`, []);
    });
  },

  /**
   * @function getDefaultItemByCode
   * Method to get default item only on the initial iteration
   */
  getDefaultItemByCode(fetchedList, type) {
    let component = this;
    let defaultLevels = component.get('defaultLevels');
    let defaultCode = defaultLevels[`${type}Code`];
    let defaultItem = [];
    if (fetchedList) {
      fetchedList.some(function(curItem) {
        let isDefaultItemAvailable = curItem.code === defaultCode;
        if (isDefaultItemAvailable) {
          defaultItem = curItem;
          return isDefaultItemAvailable;
        }
      });
    }
    return defaultItem;
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array}
   * Property to store taxonomy categories
   */
  categories: Ember.computed.alias('categoryList'),

  /**
   * @property {Array}
   * Property to store fetched subjects
   */
  subjects: [],

  /**
   * @property {Array}
   * Property to store fetched courses
   */
  courses: [],

  /**
   * @property {Array}
   * Property to store fetched domains
   */
  domains: [],

  /**
   * @property {String}
   * Property to store default framework id
   */
  defaultFramework: 'GDT',

  /**
   * @property {String}
   * Property to store selected category id
   */
  selectedCategory: Ember.computed('dataLevels', function() {
    return this.get('dataLevels.subjectClassification');
  }),

  /**
   * @property {Object}
   * Property to store selected subject info
   */
  selectedSubject: null,

  /**
   * @property {Object}
   * Property to store selected course info
   */
  selectedCourse: null,

  /**
   * @property {Array}
   * Property to store selected domain stack
   */
  domainStack: [],

  /**
   * @property {JSON}
   * Property to store current/default data levels
   */
  defaultLevels: Ember.computed('dataLevels', function() {
    return this.get('dataLevels');
  }),

  /**
   * @property {Boolean}
   * Property to decide whether it's a initial iteration or not
   */
  isInitialIteration: false
});
