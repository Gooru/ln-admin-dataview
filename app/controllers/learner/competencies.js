import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  /**
   * @requires service:competency
   */
  competencyService: Ember.inject.service('api-sdk/competency'),


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
  isGridModeEnabled: false,

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
  competencyStatus: ['Not Started', 'in_progress', 'Inferred', 'Asserted', 'Earned', 'Earned'],


  //------------------------------------------------------------------------
  // Events

  actions: {

    onClickBackButton: function() {
      this.transitionToRoute('learner');
    },

    onChooseListView: function() {
      this.set('isGridModeEnabled', false);
    },

    onChooseGridView: function() {
      this.set('isGridModeEnabled', true);
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
      controller.set('userId', userId);
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
        } else if (data.status === 1) {
          status = 'in_progress'
          collectionData = collections;
        } else {
          status = 'Not Started'
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
      controller.set('isShowCourseMatrix', selectedView === 'course');

    }
  }


});
