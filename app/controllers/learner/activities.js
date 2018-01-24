import Ember from 'ember';
import { RESOURCE_TYPES } from 'admin-dataview/config/config';
export default Ember.Controller.extend({

  //------------------------------------------------------------------------
  //Events
  classNames: ['learner-activities'],

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:learners
   */
  learnersService: Ember.inject.service('api-sdk/learners'),

  //------------------------------------------------------------------------
  //Properties
  /**
   * @property to store list of activities data
   */
  learnerActivities: [],

  /**
   * @property {Array}
   * List of resource types
   */
  resourceTypes: RESOURCE_TYPES,

  //------------------------------------------------------------------------
  //Actions
  actions: {

    /**
     * @function onClickBackButton
     * Action triggerred when an user click back arrow in the page
     */
    onClickBackButton: function() {
      let controller = this;
      controller.transitionToRoute('learner');
    }
  }

});
