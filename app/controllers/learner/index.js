import Ember from 'ember';
import {RESOURCE_TYPES} from 'admin-dataview/config/config';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Properties

  /**
   * User id of the learner
   * @type {String}
   */
  userId: null,

  // -------------------------------------------------------------------------
  // Actions

  actions:  {
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
        controller.transitionToRoute('learner.activities', {queryParams});
      } else if (routeTo === 'courses') {
        controller.transitionToRoute('learner.journeys', controller.get('userId'));
      }
    },
    onExploreJourneyTaken: function() {
      let controller = this;
      controller.transitionToRoute('learner.journeys', controller.get('userId'));
    },
    onExploreCompetencies: function() {
      let controller = this;
      controller.transitionToRoute('learner.competencies', controller.get('userId'));
    }
  }


});
