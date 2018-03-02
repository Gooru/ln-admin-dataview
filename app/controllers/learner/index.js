import Ember from 'ember';
import {
  RESOURCE_TYPES
} from 'admin-dataview/config/config';


export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  /**
   * @requires service:learners
   */
  learnersService: Ember.inject.service('api-sdk/learners'),

  /**
   * @requires service:competency
   */
  competencyService: Ember.inject.service('api-sdk/competency'),


  /**
   * @requires service:performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),


  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Properties


  /**
   * data of the learner
   * @type {Array}
   */
  data: null,

  /**
   * Indicates which mode currently Enabled
   * @type {Boolean}
   */
  isListModeEnabled: false,

  /**
   * Indicates which mode currently Enabled
   * @type {Boolean}
   */
  isCourseModeEnabled: false,

  /**
   * Indicates which mode currently Enabled
   * @type {Boolean}
   */
  isDomainModeEnabled: true,

  /**
   * show pull out .
   * @type {boolean}
   */
  showPullOut: false,

  /**
   * pull out show more options  .
   * @type {boolean}
   */
  showMore: true,

  /**
   * Toggle the couse and tomain view  .
   * @type {boolean}
   */
  isShowCourseMatrix: false,


  /**
   * Show loading spinner
   */
  isLoading: false,

  /**
   * Show loading spinner
   */
  competencyStatus: ['Not Started', 'in progress', 'Inferred', 'Asserted', 'Earned', 'Earned'],

  /**
   * It  will have default subject category
   * @type {String}
   */
  selectedSubjectCategory: 'k_12',

  /**
   * It  will have default competency page Enabled
   * @type {String}
   */
  isCompetency: true,

  /**
   * It will indicates the state of skyline.
   * @type {Boolean}
   */
  isSkylineEnabled: false,

  /**
   * It will have  couse item selected default .
   * @type {string}
   */
  isSelectedCourse: Ember.computed(function() {
    return 'Journeys Summary';
  }),


  /**
   * It will have  subject item selected default .
   * @type {string}
   */
  isSelectedSubject: Ember.computed('taxonomySubjects', function() {
    let controller = this;
    let subjects = controller.get('taxonomySubjects');
    if (subjects) {
      let subject = subjects.objectAt(0);
      return subject.subjectTitle;
    }
  }),

  //------------------------------------------------------------------------
  // actions

  actions: {

    onClickBackButton: function() {
      this.transitionToRoute('learner');
    },

    /**
     * Trigger when skyline toggle button got changed
     */
    onChangeSkyline: function(value) {
      this.set('isSkylineEnabled', value);
    },

    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    onCompetencyPullOut: function(data) {
      let controller = this;
      controller.set('isLoading', true);
      controller.set('showPullOut', true);
      controller.set('showMore', false);
      let userId = controller.get('userId');
      return Ember.RSVP.hash({
        collections: controller.get('competencyService').getUserPerformanceCompetencyCollections(userId, data.competencyCode)
      }).then(({
        collections
      }) => {
        controller.set('isLoading', false);
        let collectionData = Ember.A();
        let status;
        let statusMastered;
        if (data.status === 2 || data.status === 3 || data.status === 4 || data.status === 5) {
          status = 'Mastered';
          statusMastered = controller.get('competencyStatus') ? controller.get('competencyStatus')[data.status] : null;
          collections.forEach(collection => {
            let type = collection.get('collectionType');
            let score = collection.get('score');
            if (type === 'assessment' && score >= 80) {
              collectionData.push(collection);
            }
          });
          if (!collectionData.length >= 1) {
            statusMastered = controller.get('competencyStatus') ? controller.get('competencyStatus')[2] : null;
          }
        } else if (data.status === 1) {
          status = 'in progress';
          collectionData = collections;
        } else {
          status = 'Not Started';
        }
        controller.set('collection', collectionData);
        controller.set('title', data.courseName ? data.courseName : data.domainName);
        controller.set('description', data.competencyCode);
        let competency = {
          status: status ? status : 'NA',
          date: data.date,
          statusMastered: statusMastered ? statusMastered : null,
          competencyName: data.competencyName
        };
        controller.set('competency', competency);

      });
    },

    onChangeHeaderView(selectedView) {
      let controller = this;
      controller.set('isCourseModeEnabled', selectedView === 'course');
      controller.set('isListModeEnabled', selectedView === 'list');
    },

    subjectChange: function(subject) {
      let controller = this;
      controller.set('subjectId', subject.id);
      controller.set('subjectTitle', subject.subjectTitle);
    },


    courseChange: function(course) {
      let controller = this;
      controller.set('isSelectedCourse', course.courseTitle);
      if (course.courseTitle === 'Journeys Summary') {
        controller.set('isJourney', true);
      } else {
        controller.set('isCompetency', false);
        controller.set('isJourney', false);
      }
      controller.set('isCompetency', false);
      if (course.classId) {
        controller.courseInClass(course);
      } else {
        controller.courseOutClass(course);
      }
    },

    competencyTabs: function(tabs) {
      let controller = this;
      controller.set('isCompetency', tabs === 'competency');
      controller.set('isJourney', tabs === 'journey');
      if (controller.get('isJourney')) {
        controller.fetchJourneyByUser();
      }
    },
    /**
     * @function onClickExploreButton
     * Action triggered when user click on explore button
     */
    onClickExploreButton: function(routeTo) {
      let controller = this;
      if (routeTo === 'activities') {
        let queryParams = {
          'resource': RESOURCE_TYPES[0]
        };
        controller.transitionToRoute('learner.activities', {
          queryParams
        });
      } else if (routeTo === 'courses') {
        controller.transitionToRoute('learner.journeys', controller.get('userId'));
      }
    },

    onExploreJourneyTaken: function() {
      let controller = this;
      controller.transitionToRoute('learner.journeys', controller.get('userId'));
    },

    onClickCourseBackButton: function() {
      let controller = this;
      controller.set('isCompetency', false);
      controller.set('isJourney', true);
      controller.set('isSelectedCourse', 'Journeys Summary');
    }

  },

  // -------------------------------------------------------------------------
  // Events

  init: function() {
    this._super(...arguments);
    let controller = this;
    controller.set('isCompetency', true);
    let subjectCategory = controller.get('selectedSubjectCategory');
    controller.fetchSubjectsByCategory(subjectCategory);
  },


  fetchSubjectsByCategory: function(subjectCategory) {
    let controller = this;
    controller.get('taxonomyService').getSubjects(subjectCategory).then(subjects => {
      let subject = subjects.objectAt(0);
      controller.set('taxonomySubjects', subjects);
      controller.set('subjectId', subject.id);
      controller.set('subjectTitle', subject.subjectTitle);
    });
  },


  fetchJourneyByUser: function() {
    let controller = this;
    let userId = controller.get('userId');
    controller.get('learnersService').getUserStatsByCourse(userId, '3m').then(journeys => {
      let journeyCourse = Ember.A();
      let arrayList = [{
        courseTitle: 'Journeys Summary'
      }];
      journeys.forEach(course => {
        arrayList.push(course);
      });
      journeyCourse.push(arrayList);
      controller.set('journeyCourses', journeyCourse[0]);
    });
  },

  courseInClass: function(course) {
    let controller = this;
    controller.set('isLoading', true);
    let courseId = course.courseId;
    let classId = course.classId;
    let userId = controller.get('userId');
    controller.get('performanceService').getUserPerformanceUnits(userId, courseId, classId).then(performance => {
      controller.set('userPerformanceUnits', performance);
      controller.set('courseId', course.courseId);
      controller.set('classId', course.classId);
      controller.set('courseTitle', course.courseTitle);
      controller.set('isLoading', false);

    });
  },

  courseOutClass: function(course) {
    let controller = this;
    controller.set('isLoading', true);
    let courseId = course.courseId;
    let classId = course.classId;
    let userId = controller.get('userId');
    controller.get('performanceService').getUserPerformanceUnits(userId, courseId, classId).then(performance => {
      controller.set('userPerformanceUnits', performance);
      controller.set('courseId', course.courseId);
      controller.set('classId', course.classId);
      controller.set('courseTitle', course.courseTitle);
      controller.set('isLoading', false);

    });
  }


});
