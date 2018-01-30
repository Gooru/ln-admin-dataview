import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['competencies-accordion-summary-items'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * collection
   * @return {Object}
   */
  collection: null,

  /**
   * user id
   * @type {String}
   */
  userId: null,

  /**
   *  Indicates loading icon enabled or not
   * @type {Boolean}
   */
  loading: false,

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectCompetencyItems: function(collection) {
      let component = this;
      component.set('loading', true);
      let userId = component.get('userId');
      let collectionId = collection.get('id');
      let sessionId = collection.get('sessionId');
      let summaryReportPromise = null;
      if (collection.get('collectionType') === 'assessment') {
        summaryReportPromise = component.get('performanceService').getUserPerformanceResourceInAssessment(userId, 'ad8ce6e0-f21f-41f0-a96c-68985d85ee54', 'c6a6aa8e-8190-4bc2-b6e6-2b369f848830', '446698f7-23fb-44e2-9712-f1db2b64c37d', collectionId, sessionId, 'eded8314-8538-4729-90c3-7b6fa4d29cdb');
      } else {
        summaryReportPromise = component.get('performanceService').getUserPerformanceResourceInCollection(userId, null, null, null, collectionId, sessionId, null);
      }
      Ember.RSVP.hash({
        resources: summaryReportPromise
      }).then(({
        resources
      }) => {
        component.set('loading', false);
        component.set('resources', resources);
        component.resetAccordionArrowBasedOnState();
      });
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  resetAccordionArrowBasedOnState: function() {
    let component = this;
    if (component.$(`#${component.get('elementId')}-heading > .panel-title a i`).hasClass('fa-caret-down')) {
      component.$(`#${component.get('elementId')}-heading > .panel-title a i`).addClass('fa-caret-up').removeClass('fa-caret-down');
    } else {
      component.$(`#${component.get('elementId')}-heading > .panel-title a i`).addClass('fa-caret-down').removeClass('fa-caret-up');
    }
  }

});
