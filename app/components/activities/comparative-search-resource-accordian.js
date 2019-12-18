import Ember from 'ember';
import TaxonomyTag from 'admin-dataview/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'admin-dataview/models/taxonomy/taxonomy-tag-data';
import {
  PLAYER_EVENT_SOURCE,
  PLAYER_WINDOW_NAME
} from 'admin-dataview/config/config';
import { getGooruAppEndpointUrl } from 'admin-dataview/utils/endpoint-config';
import { getQuestionFormat } from 'admin-dataview/utils/utils';

export default Ember.Component.extend({
  // --------------------------------------------------------------
  // Attributes
  classNames: ['comparative-search-resource-accordian'],

  // ----------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} activity hold the single activity details
   */
  activity: null,

  /**
   * @property {Boolean} isExpanded controll the eye icon to arrow up
   */
  isExpanded: false,

  /**
   * @property {Boolean} isExpanded controll play arrow
   */
  isPlay: false,

  /**
   * @property {string} activityFormat hold the  activity format
   */
  activityFormat: Ember.computed('activity', function() {
    let activity = this.get('activity');
    if (activity.type === 'question') {
      return getQuestionFormat('value', activity.format);
    } else {
      return activity.format;
    }
  }),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('activity.standards.[]', function() {
    let standards = this.get('activity.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  // ---------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action trigger when click collection or assessment
     */
    onToggleActivity() {
      let component = this;
      component.toggleProperty('isExpanded');
      component.toggleProperty('isPlay');
      component
        .$('.comparative-gooru-resource-accordian-panel')
        .slideToggle(500);
    },

    /**
     * Action triggered when the user play a resource
     */
    onPlay(activity) {
      let playerURL = '';
      if (activity.get('type') === 'resource') {
        playerURL = `${getGooruAppEndpointUrl()}/content/resources/play/${activity.get(
          'id'
        )}?source=${PLAYER_EVENT_SOURCE.RGO}`;
      } else {
        playerURL = `${getGooruAppEndpointUrl()}/content/questions/play/${activity.get(
          'id'
        )}?source=${PLAYER_EVENT_SOURCE.RGO}`;
      }
      window.open(playerURL, PLAYER_WINDOW_NAME);
    }
  }
});
