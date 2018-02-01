import Ember from 'ember';
import TaxonomySerializer from 'admin-dataview/serializers/taxonomy/taxonomy';

/**
 * Serializer for activities endpoints
 *
 * @typedef {Object} contentSerializers
 */
export default Ember.Object.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service(),


  /**
   * @property {TaxonomySerializer} taxonomySerializer
   */
  taxonomySerializer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'taxonomySerializer',
      TaxonomySerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },


  /**
   * Normalized data of resource by id
   * @return {Object}
   */
  normalizeContentResourceById: function(response) {
    response = Ember.Object.create(response);
    const serializer = this;
    let taxonomy = serializer
      .get('taxonomySerializer')
      .normalizeTaxonomyObject(response.taxonomy);
    response.taxonomy = taxonomy[0];
    return response;
  }


});
