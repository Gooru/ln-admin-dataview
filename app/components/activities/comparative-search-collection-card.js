import Ember from 'ember';
import TaxonomyTag from 'admin-dataview/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'admin-dataview/models/taxonomy/taxonomy-tag-data';
import {
  getResourceFormat,
  getQuestionFormat
} from 'admin-dataview/utils/utils';

export default Ember.Component.extend({
  // Attributes
  classNames: ['comparative-search-collection-card'],

  //------------------------------------------------------------------------
  // Dependencies

  contentService: Ember.inject.service('api-sdk/content'),

  // ----------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} activity hold the single activity details
   */
  activity: null,

  /**
   * @property {string} activityFormat hold the  activity format
   */
  activityFormat: Ember.computed('activity', function() {
    let activity = this.get('activity');
    if (activity.content_format === 'resource') {
      return getResourceFormat(activity.content_subformat);
    } else {
      return getQuestionFormat('apiCode', activity.content_subformat);
    }
  }),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('activity', function() {
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
    }
  }
});
