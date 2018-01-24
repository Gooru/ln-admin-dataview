import Ember from 'ember';
import {formatTime} from 'admin-dataview/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['course-accordion-unit'],

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
    onClickUnitTitle: function(unitId) {
      unitId = 'unit-id';
      let component = this;
      let unitBody =   component.$('.unit-content .unit-body');
      if (component.get('isExpanded')) {
        component.toggleProperty('isExpanded');
        unitBody.slideUp();
      } else {
        unitBody.slideDown();
        component.set('isLoading', true);
        let lessonPromise = Ember.RSVP.resolve(component.get('performanceService').getUserPerformanceLessons('user-id', 'course-id', unitId, 'class-id'));
        return Ember.RSVP.hash({
          lessons: lessonPromise
        })
          .then(function(hash) {
            component.set('lessons', hash.lessons);
            component.toggleProperty('isExpanded');
            component.toggleProperty('isLoading');
          });
      }
    }
  },

  //------------------------------------------------------------------------
  //Properties

  /**
   * @property {Array}
   * Store current unit item
   */
  unit: [],

  /**
   * @property {Boolean}
   * show/hide unit body view
   */
  isExpanded: false,

  /**
   * @property {Boolean}
   * show/hide loading spinner
   */
  isLoading: true,

  /**
   * @property {Array}
   * Store lessons data
   */
  lessons: [],

  /**
   * @property {String}
   * Store formatted unit timespent value
   */
  timespent: Ember.computed('unit', function() {
    let component = this;
    let assessmentTimespent = component.get('unit.unitAsmtTimeSpent');
    let collectionTimespent = component.get('unit.unitCollTimeSpent');
    return formatTime(assessmentTimespent + collectionTimespent);
  })

});
