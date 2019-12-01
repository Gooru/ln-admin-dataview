import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['comparative-search-collection-accordian'],

  // ---------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:content
   */
  contentService: Ember.inject.service('api-sdk/content'),

  // ----------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} activity hold the single activity details
   */
  activity: null,

  /**
   * @property {Array} activityQuestions hold the acitivity data
   */

  activityContent: [],

  /**
   * @property {Boolean} isExpanded controll the eye icon to arrow up
   */
  isExpanded: false,

  // ---------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action trigger when click collection or assessment
     */
    onToggleActivity(content) {
      let component = this;
      component.toggleProperty('isExpanded');
      if (component.get('isExpanded')) {
        component.getContentById(content);
      }
      component
        .$('.comparative-gooru-collection-accordian-panel')
        .slideToggle(500);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function getContentById method used to get assessment or collection details
   */

  getContentById(content) {
    let component = this;
    if (content.type === 'collection') {
      component
        .get('contentService')
        .getCollectionById(content.get('id'))
        .then(activityData => {
          component.set('activityContent', activityData.content);
        });
    } else if (content.type === 'assessment') {
      component
        .get('contentService')
        .getAssessmentById(content.get('id'))
        .then(activityData => {
          component.set('activityContent', activityData.question);
        });
    }
  }
});
