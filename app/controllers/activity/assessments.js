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
   * It maintains the list of assessment data
   * @type {Array}
   */
  assessments: Ember.A(),

  /**
   * It maintains the search total hitcount
   * @type {Number}
   */
  hitCount: 0,

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods

  onChangeSearchTerm: Ember.observer('term', function() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let filters = {
      'flt.publishStatus': 'published'
    };
    Ember.RSVP.hash({
      assessments: controller.get('searchService').searchAssessments(term, filters)
    }).then(({
      assessments
    }) => {
      controller.set('assessments', assessments.get('searchResults'));
      controller.set('hitCount', assessments.get('hitCount'));
    });
  })


});
