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
        controller.set('collection', collections);
        controller.set('title', data.courseName ? data.courseName : data.domainName);
        controller.set('description', data.competencyCode);
        let status;
        if (data.status === 5) {
          status = 'mastered';
        } else {
          status = 'in_progress';
        }
        let competency = {
          status: status,
          date: data.date,
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
