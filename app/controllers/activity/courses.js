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
   * It maintains the list of course data
   * @type {Array}
   */
  courses: Ember.A(),

  /**
   * It maintains the search total hitcount
   * @type {Number}
   */
  hitCount: 0,

  // -------------------------------------------------------------------------
  // Methods

  onChangeSearchTerm: Ember.observer('term', function() {
    let controller = this;
    let term = controller.get('term') ? controller.get('term') : '*';
    let filters = {'flt.publishStatus': 'published'};
    Ember.RSVP.hash({
      courses: controller.get('searchService').searchCourses(term, filters)
    }).then(({courses}) => {
      controller.set('courses', courses.get('searchResults'));
      controller.set('hitCount', courses.get('hitCount'));
    });
  })

});
