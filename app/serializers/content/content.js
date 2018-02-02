import Ember from 'ember';
import TaxonomySerializer from 'admin-dataview/serializers/taxonomy/taxonomy';
import {DEFAULT_IMAGES} from 'admin-dataview/config/config';


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
    response = Ember.A(response);
    let thumbnail = response.get('thumbnail');
    let cdnUrls = this.get('session.cdnUrls');
    if (!thumbnail) {
      response.set('thumbnail', DEFAULT_IMAGES.USER_PROFILE);
    } else {
      response.set('thumbnail', cdnUrls.user + thumbnail);
    }
    const serializer = this;
    let taxonomy = serializer
      .get('taxonomySerializer')
      .normalizeTaxonomyObject(response.taxonomy);
    response.taxonomy = taxonomy[0];
    return response;
  }


});
