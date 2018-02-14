import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Query

  queryParams: ['term'],


  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  //-------------------------------------------------------------------------
  //Properties

  /**
   * It maintains the list of collection data
   * @type {Array}
   */
  collections: Ember.A(),

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    /**
     * Action get triggered when search
     * @param  {Object} collection
     */
    onSearch: function(term) {
      console.log(term);
    }
  }

  // -------------------------------------------------------------------------
  // Methods



});
