import Ember from 'ember';
import TaxonomyTag from 'admin-dataview/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'admin-dataview/models/taxonomy/taxonomy-tag-data';

/**
 * @function taxonomyConversion
 * Taxonomy tag helper
 */
export function taxonomyFormatter(params) {
  let activity = params[0];
  let standards = activity.get('standards');
  if (standards) {
    standards = standards.filter(function(standard) {
      // Filter out learning targets (they're too long for the card)
      return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
    });
    return TaxonomyTag.getTaxonomyTags(standards);
  }
}

export default Ember.Helper.helper(taxonomyFormatter);
