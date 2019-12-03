import Ember from 'ember';
import {
  PLAYER_EVENT_SOURCE,
  PLAYER_WINDOW_NAME
} from 'admin-dataview/config/config';
import { getGooruAppEndpointUrl } from 'admin-dataview/utils/endpoint-config';

export default Ember.Component.extend({
  // --------------------------------------------------------
  // Attributes

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

  /**
   * @property {Boolean} isExpanded controll play arrow
   */
  isPlay: false,

  // ---------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action trigger when click collection or assessment
     */
    onToggleActivity(content) {
      let component = this;
      component.toggleProperty('isExpanded');
      component.toggleProperty('isPlay');
      if (component.get('isExpanded')) {
        component.getContentById(content);
      }
      component
        .$('.comparative-gooru-collection-accordian-panel')
        .slideToggle(500);
    },

    /**
     * Action triggered when the user play collection
     * It'll open the player in new tab
     */
    onPlayAssessment(assessmentId) {
      let playerURL = `${getGooruAppEndpointUrl()}/player/${assessmentId}?source=${
        PLAYER_EVENT_SOURCE.RGO
      }`;
      window.open(playerURL, PLAYER_WINDOW_NAME);
    },

    /**
     * Action triggered when the user play collection
     * It'll open the player in new tab
     */
    onPlayCollection(collectionId) {
      let playerURL = `${getGooruAppEndpointUrl()}/player/${collectionId}?source=${
        PLAYER_EVENT_SOURCE.RGO
      }`;
      window.open(playerURL, PLAYER_WINDOW_NAME);
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
