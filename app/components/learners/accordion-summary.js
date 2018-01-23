import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['learners', 'accordion-summary'],

  /**
   * @requires service:performance
   */
  competencyService: Ember.inject.service('api-sdk/competency'),


  classNameBindings: ['isExpanded:expanded'],

  // -------------------------------------------------------------------------
  // Properties


  /**
   * Data of competencies competencies data summary
   * @return {Array}
   */
  data: null,


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectCompetency: function() {
      let component = this;

      let lessonPromise = Ember.RSVP.resolve(component.get('competencyService').getUserCompetencyCourseCollections('user-id', 'course-id'));
      return Ember.RSVP.hash({
        lessons: lessonPromise
      })
        .then(function(hash) {
          component.set('courseCollections', hash.lessons);
        });

    }

  }

  // -------------------------------------------------------------------------
  // Events

});
