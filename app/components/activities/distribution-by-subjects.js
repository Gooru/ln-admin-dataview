import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['activities-distribution-by-subjects'],

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * activities service dependency injection
   * @type {Object}
   */
  activityService: Ember.inject.service('api-sdk/activities'),


  // -------------------------------------------------------------------------
  // Events

  init: function() {
    this._super(...arguments);
    this.renderDistributionBySubjectsCharts();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Content distribution by subjects
   * @type {Array}
   */
  subjects: Ember.A(),

  /**
   * It  indicates the state of loader icon
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Content legends
   * @type {Array}
   */
  contentLegends: Ember.A([{
    'name': 'questions',
    'colorCode': '#BFE1DB'
  }, {
    'name': 'resources',
    'colorCode': '#8ED1C7'
  }, {
    'name': 'assessments',
    'colorCode': '#58B8AA'
  }, {
    'name': 'collections',
    'colorCode': '#07A392'
  }, {
    'name': 'courses',
    'colorCode': '#008D7C'
  }]),


  // -------------------------------------------------------------------------
  // Methods

  renderDistributionBySubjectsCharts: function() {
    let component = this;
    component.set('isLoading', true);
    let mathsSubjectFilter = {
      'flt.subjectName': 'math~~Mathematics'
    };
    let scienceSubjectFilter = {
      'flt.subjectName': 'science'
    };
    let socialScienceSubjectFilter = {
      'flt.subjectName': 'Social Sciences'
    };
    let ELAScienceSubjectFilter = {
      'flt.subjectName': 'English Language Arts'
    };
    Ember.RSVP.hash({
      maths: component.get('activityService').getLearningMaps(mathsSubjectFilter),
      science: component.get('activityService').getLearningMaps(scienceSubjectFilter),
      socialScience: component.get('activityService').getLearningMaps(socialScienceSubjectFilter),
      ela: component.get('activityService').getLearningMaps(ELAScienceSubjectFilter)
    }).then(({
      maths,
      science,
      socialScience,
      ela
    }) => {
      let subjects = component.get('subjects');
      subjects.pushObject(component.mapContentCountsBySubject('Maths', maths));
      subjects.pushObject(component.mapContentCountsBySubject('Science', science));
      subjects.pushObject(component.mapContentCountsBySubject('Social Science', socialScience));
      subjects.pushObject(component.mapContentCountsBySubject('ELA', ela));
      component.set('isLoading', false);
    });
  },

  mapContentCountsBySubject: function(name, subject) {
    let questionCounts = subject.get('question').get('totalHitCount');
    let resourceCounts = subject.get('resource').get('totalHitCount');
    let assessmentCounts = subject.get('assessment').get('totalHitCount');
    let collectionCounts = subject.get('collection').get('totalHitCount');
    let courseCounts = subject.get('course').get('totalHitCount');
    let totalCount = questionCounts + resourceCounts + assessmentCounts + collectionCounts + courseCounts;
    let contentCounts = Ember.A([{
      'name': 'questions',
      'value': subject.get('question').get('totalHitCount'),
      'colorCode': '#BFE1DB'
    }, {
      'name': 'resources',
      'value': subject.get('resource').get('totalHitCount'),
      'colorCode': '#8ED1C7'
    }, {
      'name': 'assessments',
      'value': subject.get('assessment').get('totalHitCount'),
      'colorCode': '#58B8AA'
    }, {
      'name': 'collections',
      'value': subject.get('collection').get('totalHitCount'),
      'colorCode': '#07A392'
    }, {
      'name': 'courses',
      'value': subject.get('course').get('totalHitCount'),
      'colorCode': '#008D7C'
    }]);
    let result = Ember.Object.create({
      'name': name,
      'totalCount': totalCount,
      'contentCounts': contentCounts
    });
    return result;
  }

});
