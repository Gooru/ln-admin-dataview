import Ember from 'ember';
import {formatTime} from 'admin-dataview/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['course-accordion-collection'],


  classNameBindings: ['isExpanded:expanded:collapsed'],

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  //------------------------------------------------------------------------
  //Actions
  actions: {
    onClickCollectionTitle: function(colectionId, collectionType) {
      let component = this;
      let collectionBody = component.$('.collection-content .collection-body');
      if (component.get('isExpanded')) {
        component.toggleProperty('isExpanded');
        collectionBody.slideUp();
      } else {
        collectionBody.slideDown();
        component.set('isLoading', true);
        let resourcePromise = [];
        if (collectionType === 'assessment') {
          resourcePromise = component.fetchAssessmentResources();
        } else if (collectionType === 'collection') {
          resourcePromise = component.fetchCollectionResources();
        }
        return resourcePromise.then(function(resources) {
          component.set('resources', resources);
          component.toggleProperty('isExpanded');
          component.toggleProperty('isLoading');
        });
      }
    }
  },

  //------------------------------------------------------------------------
  //Methods

  /**
   * @function fetchAssessmentResources
   * @return list of selected assessment resources
   */
  fetchAssessmentResources: function() {
    let component = this;
    let assessmentPromise = Ember.RSVP.resolve(component.get('performanceService').getUserPerformanceResourceInAssessment('user-id', 'course-id', 'unit-id', 'lesson-id', 'assessment-id', 'session-id', 'class-id'));
    return Ember.RSVP.hash({
      assessmentResources: assessmentPromise
    })
      .then(function(hash) {
        return hash.assessmentResources;
      });
  },

  /**
   * @function fetchCollectionResources
   * @return list of selected collection resources
   */
  fetchCollectionResources: function() {
    let component = this;
    let collectionPromise = Ember.RSVP.resolve(component.get('performanceService').getUserPerformanceResourceInCollection('user-id', 'course-id', 'unit-id', 'lesson-id', 'collection-id', 'session-id', 'class-id'));
    return Ember.RSVP.hash({
      collectionResources: collectionPromise
    })
      .then(function(hash) {
        return hash.collectionResources;
      });
  },

  //------------------------------------------------------------------------
  //Dependencies
  /**
   * @property {Boolean}
   * show/hide expanded view
   */
  isExpanded: false,

  /**
   * @property {Boolean}
   * show/hide loading spinner
   */
  isLoading: true,

  /**
   * @property {Array}
   * Store collections data
   */
  collection: [],

  /**
   * @property {Array}
   * Store selected collection resource data
   */
  resources: [],

  /**
   * @property {String}
   * Store formatted timespent value
   */
  collectionTimespent: Ember.computed('collection', function() {
    let component = this;
    let timespent = component.get('collection.timeSpent');
    return formatTime(timespent);
  })

  //  resourceTimespent: Ember.computed(function() {
  //    let component = this;
  //    let timespent = component.get('timeSpent');
  //    return formatTime(timespent);
  //  })
});
