import Ember from 'ember';
import TaxonomyTag from 'admin-dataview/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'admin-dataview/models/taxonomy/taxonomy-tag-data';
import { PLAYER_WINDOW_NAME, ROLES } from 'admin-dataview/config/config';
import { getGooruAppEndpointUrl } from 'admin-dataview/utils/endpoint-config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['activity-offline-activity-card'],

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * offlineActivity object
   * @type {Object}
   */
  offlineActivity: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('offlineActivity.standards.[]', function() {
    let standards = this.get('offlineActivity.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function onShowPullOut
     * Action triggered when the user click on the play icon
     */
    onShowPullOut(offlineActivity) {
      let component = this;
      component.sendAction('onShowPullOut', offlineActivity);
    },

    /**
     * Action triggered when the user play offlineActivity
     * It'll open the player in new tab
     */
    onPlayofflineActivity(offlineActivityId) {
      let playerURL = `${getGooruAppEndpointUrl()}/player-offline-activity/${offlineActivityId}?isPreview=true&role=${
        ROLES.TEACHER
      }`;
      window.open(playerURL, PLAYER_WINDOW_NAME);
    }
  }
});
