import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * Competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * show pull out .
   * @type {boolean}
   */
  showPullOut: false,

  /**
   * Show loading spinner
   */
  competencyStatus: [
    'Not Started',
    'In progress',
    'Inferred',
    'Asserted',
    'Earned',
    'Demonstrated'
  ],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let controller = this;
    let subjectCategory = controller.get('selectedSubjectCategory');
    controller.fetchSubjectsByCategory(subjectCategory);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    //Action triggered when the user click a subject from the right panel
    onSelectItem(item) {
      let controller = this;
      controller.set('selectedSubject', item);
    },

    /**
     * Action triggered when the use toggle matrix view
     */
    onToggleView(item) {
      let controller = this;
      controller.set('selectedMatrixView', item);
    },

    onToggleChart(isChecked) {
      let controller = this;
      controller.set('isExpandChartEnabled', isChecked);
    },

    /**
     *
     * Triggered when an cell is selected
     * @param item
     */
    onCompetencyPullOut(data) {
      let controller = this;
      controller.set('isLoading', true);
      controller.set('showPullOut', true);
      controller.set('showMore', false);
      let userId = controller.get('userId');
      return Ember.RSVP.hash({
        collections: controller
          .get('competencyService')
          .getUserPerformanceCompetencyCollections(userId, data.competencyCode)
      }).then(({ collections }) => {
        controller.set('isLoading', false);
        let collectionData = Ember.A();
        let status;
        let statusMastered;
        if (
          data.status === 2 ||
          data.status === 3 ||
          data.status === 4 ||
          data.status === 5
        ) {
          status = 'Mastered';
          statusMastered = controller.get('competencyStatus')
            ? controller.get('competencyStatus')[data.status]
            : null;
          collectionData = collections;
          if (!collectionData.length >= 1) {
            statusMastered = controller.get('competencyStatus')
              ? controller.get('competencyStatus')[2]
              : null;
          }
        } else if (data.status === 1) {
          status = 'in progress';
          collectionData = collections;
        } else {
          status = 'Not Started';
        }
        controller.set('collection', collectionData);
        controller.set(
          'title',
          data.courseName ? data.courseName : data.domainName
        );
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

    /**
     * Action triggered once the last updated date returned from the API
     */
    onGetLastUpdated(lastUpdated) {
      this.set('lastUpdated', lastUpdated);
    },

    /**
     * Action triggered when select a month/year from the filter
     */
    onSelectMonth(date) {
      let timeLine = {
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
      this.set('timeLine', timeLine);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchSubjectsByCategory
   * @param subjectCategory
   * Method to fetch list of subjects using given category level
   */
  fetchSubjectsByCategory(subjectCategory) {
    let controller = this;
    controller
      .get('taxonomyService')
      .getTaxonomySubjects(subjectCategory)
      .then(subjects => {
        let subject = subjects[1];
        controller.set('taxonomySubjects', subjects);
        controller.set('selectedSubject', subject);
      });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String}
   * Property to store user selected category level
   */
  selectedSubjectCategory: 'k_12',

  /**
   * @property {Array}
   * Property to store list of taxonomy subjects
   */
  taxonomySubjects: null,

  /**
   * @property {Object}
   * Property to store user selected subject info
   */
  selectedSubject: null,

  /**
   * @property {String}
   * Property to store userId of the student
   */
  userId: Ember.computed('user', function() {
    let component = this;
    return component.get('user.userId');
  }),

  /**
   * @type {String}
   * Property to store user selected matrix view
   */
  selectedMatrixView: 'domain',

  /**
   * Property to show/hide expanded chart
   */
  isExpandChartEnabled: false,

  /**
   * @property {JSON}
   * Property to store currently selected month and year
   */
  timeLine: Ember.computed(function() {
    let curDate = new Date();
    return {
      month: curDate.getMonth() + 1,
      year: curDate.getFullYear()
    };
  })
});
