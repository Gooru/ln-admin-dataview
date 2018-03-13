import Ember from 'ember';
import Utils from 'admin-dataview/utils/taxonomy';
import {
  CONTENT_TYPES
} from 'admin-dataview/config/config';


export default Ember.Controller.extend({

  //---------------------------------------------------------------------------
  //Dependencies

  session: Ember.inject.service(),

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * Search service to fetch content details
   */
  searchService: Ember.inject.service('api-sdk/search'),


  //---------------------------------------------------------------------------
  //Properties

  /**
   * It will have the data of  latest selected subject object.
   * @return {Object}
   */
  selectedSubject: Ember.computed('subjects', function() {
    let subject = this.get('subjects').objectAt(0);
    return subject;
  }),

  /**
   * Currently logged in user Id
   * @type {userId}
   */
  userId: Ember.computed.alias('session.user.id'),

  /**
   * It maintains the state of pull out visibility
   * @type {Boolean}
   */
  showPullOut: false,

  /**
   * Selected domain data
   */
  selectedDomainData: null,

  /**
   * Content count of the selected domain data
   */
  contentCount: null,

  /**
   * It maintains the latest selected category, by default it will be k_12.
   * @type {String}
   */
  selectedCategory: 'k_12',

  /**
   * Show loading spinner
   */
  isLoading: true,


  //---------------------------------------------------------------------------
  //Actions

  actions: {
    /**
     * Action get triggred when subject get choosen
     * @param  {Number} subjectIndex
     */
    onChooseSubject: function(subjectIndex) {
      let controller = this;
      let subjects = controller.get('subjects');
      let subject = subjects.objectAt(subjectIndex);
      controller.set('selectedSubject', subject);
      Ember.$('.subject-name').removeClass('active');
      Ember.$('.subject-round-icon').removeClass('active');
      Ember.$(`.subject-${  subjectIndex}`).addClass('active');
    },

    /**
     * Action get triggered when domain cell clicked
     * @param  {Object} category
     */
    onChooseDomain: function(selectedDomain) {
      let controller = this;
      let domainId = `${selectedDomain.courseCode  }-${  selectedDomain.domainCode}`;
      let subjectName = controller.get('selectedSubject.title');
      let selectedDomainData = Ember.Object.create({
        'id': domainId,
        'name': selectedDomain.domainName,
        'code': domainId,
        'parent': `${subjectName  }  > ${  selectedDomain.courseName}`,
        'filters': {
          'flt.courseName': selectedDomain.courseName,
          'flt.domainName': selectedDomain.domainName
        }
      });
      controller.set('selectedDomainData', selectedDomainData);
      controller.set('showPullOut', true);
      controller.set('isLoading', true);
      controller.getSearchContentCount(selectedDomainData).then(function(contentCount) {
        controller.set('contentCount', contentCount);
        controller.set('isLoading', false);
      });
    }

  },

  //---------------------------------------------------------------------------
  //Methods

  /**
   * Get Content count of search results
   * return hashed json of each content type count
   */
  getSearchContentCount: function(selectedDomainData) {
    let filters = selectedDomainData.filters;
    let selectedCategory = this.get('selectedCategory');
    let query = '*';
    let start = 1;
    let length = 3;
    const contentCountData = [];
    filters['flt.subjectClassification'] = selectedCategory;

    const resourceCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(query, filters, start, length));
    const questionCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(query, filters, start, length));
    const courseCountPromise = Ember.RSVP.resolve(this.get('searchService').searchCourses(query, filters, start, length));
    const collectionCountPromise = Ember.RSVP.resolve(this.get('searchService').searchCollections(query, filters, start, length));
    const assessmentCountPromise = Ember.RSVP.resolve(this.get('searchService').searchAssessments(query, filters, start, length));
    const rubricCountPromise = Ember.RSVP.resolve(this.get('searchService').searchRubrics(query, filters, start, length));
    const unitCountPromise = Ember.RSVP.resolve(this.get('searchService').searchUnits(query, filters, start, length));
    const lessonsCountPromise = Ember.RSVP.resolve(this.get('searchService').searchLessons(query, filters, start, length));

    return Ember.RSVP.hash({
      resource: resourceCountPromise,
      question: questionCountPromise,
      course: courseCountPromise,
      collection: collectionCountPromise,
      assessment: assessmentCountPromise,
      rubric: rubricCountPromise,
      unit: unitCountPromise,
      lesson: lessonsCountPromise
    }).then(function(culcaqrCount) {
      let courseCount = culcaqrCount.course ? culcaqrCount.course.get('hitCount') : 0;
      let unitCount = culcaqrCount.unit ? culcaqrCount.unit : 0;
      let lessonCount = culcaqrCount.lesson ? culcaqrCount.lesson : 0;
      let collectionCount = culcaqrCount.collection ? culcaqrCount.collection.get('hitCount') : 0;
      let assessmentCount = culcaqrCount.assessment ? culcaqrCount.assessment.get('hitCount') : 0;
      let resourceCount = culcaqrCount.resource ? culcaqrCount.resource.get('hitCount') : 0;
      let questionCount = culcaqrCount.question ? culcaqrCount.question.get('hitCount') : 0;
      let rubricCount = culcaqrCount.rubric ? culcaqrCount.rubric : 0;

      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.COURSE, courseCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.UNIT, unitCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.LESSON, lessonCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.ASSESSMENT, assessmentCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.COLLECTION, collectionCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.RESOURCE, resourceCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.QUESTION, questionCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.RUBRIC, rubricCount));
      return contentCountData;
    });
  }
});
