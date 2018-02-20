import Ember from 'ember';

export default Ember.Controller.extend({


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:competency
   */
  competencyService: Ember.inject.service('api-sdk/competency'),


  //-------------------------------------------------------------------------
  //Properties

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
   * Show loading spinner
   */
  isLoading: false,


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    learnerCompetency: function() {
      let controller = this;
      controller.set('isLoading', true);
      controller.set('showPullOut', true);
      controller.set('showMore', false);
      let userId = '66bc2829-c6c6-4d32-ab82-8c1346a2204d';
      controller.set('userId', userId);
      return Ember.RSVP.hash({
        collections: controller.get('competencyService').getUserPerformanceCompetencyCollections(userId, 'NU.HE.E-ENG100-W-02')
      }).then(({
        collections
      }) => {
        controller.set('isLoading', false);
        controller.set('collection', collections);
        controller.set('title', 'Grade 6');
        controller.set('description', 'K12.MA-MA6');
        let competency = {
          status : 'mastered',
          date : '28 Feb 18'
        };
        controller.set('competency', competency);


      });
    }
  }
});
