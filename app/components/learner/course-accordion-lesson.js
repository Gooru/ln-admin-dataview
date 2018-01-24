import Ember from 'ember';
import {formatTime} from 'admin-dataview/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['course-accordion-lesson'],


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
    onClickLessonTitle: function(lessonId) {
      let component = this;
      lessonId = 'lesson-id';
      let lessonBody = component.$('.lesson-content .lesson-body');
      if (component.get('isExpanded')) {
        component.toggleProperty('isExpanded');
        lessonBody.slideUp();
      } else {
        lessonBody.slideDown();
        component.set('isLoading', true);
        let collectionPromise = Ember.RSVP.resolve(component.get('performanceService').getUserPerformanceCollections('user-id', 'course-id', 'unit-id', lessonId, 'class-id'));
        return Ember.RSVP.hash({
          collections: collectionPromise
        })
          .then(function(hash) {
            component.set('collections', hash.collections);
            component.toggleProperty('isExpanded');
            component.toggleProperty('isLoading');
          });
      }
    }
  },

  //------------------------------------------------------------------------
  //Properties
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
   * Store current lesson item
   */
  lesson: [],

  /**
   * @property {Array}
   * Store collections data
   */
  collections: [],

  /**
   * @property {String}
   * Store formatted timespent value
   */
  timespent: Ember.computed('lesson', function() {
    let component = this;
    let assessmentTimespent = component.get('lesson.lessonAsmtTimeSpent');
    let collectionTimespent = component.get('lesson.lessonCollTimeSpent');
    return formatTime(assessmentTimespent + collectionTimespent);
  })
});
