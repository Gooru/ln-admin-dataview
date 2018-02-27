import Ember from 'ember';
import TaxonomyTag from 'admin-dataview/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'admin-dataview/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['activity-assessment-card'],

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * assessment object
   * @type {Object}
   */
  assessment: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed(
    'assessment.standards.[]',
    function() {
      let standards = this.get('assessment.standards');
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  ),

  actions: {
    onPlayCollection: function(assessment) {
      this.sendAction('onPlayCollection', assessment);
    }
  }

});
