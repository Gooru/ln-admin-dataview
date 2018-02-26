import Ember from 'ember';
import { ACTIVITY_FILTER } from 'admin-dataview/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['activity-summary-distribution-by-content'],

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * Search service to fetch content details
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * Session service to fetch current session information
   */
  session: Ember.inject.service('session'),


  /**
   * activities service dependency injection
   * @type {Object}
   */
  activityService: Ember.inject.service('api-sdk/activities'),


  // -------------------------------------------------------------------------
  // Events

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  init: function() {
    this._super(...arguments);
    this.getSearchContentCount();
  },

  /**
   * observer event triggered when the user hit search box
   */
  onChangeSearchTerm: Ember.observer('term', function() {
    let component = this;
    component.getSearchContentCount();
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * It  indicates the state of loader icon
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintain resource subformat count data
   * @type {Array}
   */
  resources: Ember.A(),


  /**
   * Maintain question subformat count data
   * @type {Array}
   */
  questions: Ember.A(),

  /**
   * Maintain courses, units, lessons, collections and assessments  count data
   * @type {Array}
   */
  culcaCounts: Ember.A(),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get Content subformat count of search results
   * return hashed json of each content subformats
   */
  getSearchContentCount: function() {
    let component = this;
    let appliedFilters = component.getAppliedFilters();
    let term = component.get('term') || '*';
    let start = 1;
    let length = 0;
    component.set('isLoading', true);
    // Resources
    let webpageFilters = {
      'flt.resourceFormat': 'webpage'
    };
    webpageFilters = Object.assign(webpageFilters, appliedFilters);
    const webpageCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, webpageFilters, start, length));
    let audioFilters = {
      'flt.resourceFormat': 'audio'
    };
    audioFilters = Object.assign(audioFilters, appliedFilters);
    const audioCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, audioFilters, start, length));
    let videoFilters = {
      'flt.resourceFormat': 'video'
    };
    videoFilters = Object.assign(videoFilters, appliedFilters);
    const videoCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, videoFilters, start, length));
    let imageFilters = {
      'flt.resourceFormat': 'image'
    };
    imageFilters = Object.assign(imageFilters, appliedFilters);
    const imageCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, imageFilters, start, length));
    let interactiveFilters = {
      'flt.resourceFormat': 'interactive'
    };
    interactiveFilters = Object.assign(interactiveFilters, appliedFilters);
    const interactiveCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, interactiveFilters, start, length));
    let textFilters = {
      'flt.resourceFormat': 'text'
    };
    textFilters = Object.assign(textFilters, appliedFilters);
    const textCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, textFilters, start, length));

    // Questions
    let multipleChoiceFilters = {
      'flt.resourceFormat': 'multiple_choice_question'
    };
    multipleChoiceFilters = Object.assign(multipleChoiceFilters, appliedFilters);
    const multipleChoiceCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, multipleChoiceFilters, start, length));
    let multipleAnswerFilters = {
      'flt.resourceFormat': 'multiple_answer_question'
    };
    multipleAnswerFilters = Object.assign(multipleAnswerFilters, appliedFilters);
    const multipleAnswerCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, multipleAnswerFilters, start, length));
    let trueOrFalseFilters = {
      'flt.resourceFormat': 'true_false_question'
    };
    trueOrFalseFilters = Object.assign(trueOrFalseFilters, appliedFilters);
    const trueOrFalseCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, trueOrFalseFilters, start, length));
    let fillInTheBlankFilters = {
      'flt.resourceFormat': 'fill_in_the_blank_question'
    };
    fillInTheBlankFilters = Object.assign(fillInTheBlankFilters, appliedFilters);
    const fillInTheBlankCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, fillInTheBlankFilters, start, length));
    let multipleSelectImageFilters = {
      'flt.resourceFormat': 'hot_spot_image_question'
    };
    multipleSelectImageFilters = Object.assign(multipleSelectImageFilters, appliedFilters);
    const multipleSelectImageCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, multipleSelectImageFilters, start, length));
    let multipleSelectTextFilters = {
      'flt.resourceFormat': 'hot_spot_text_question'
    };
    multipleSelectTextFilters = Object.assign(multipleSelectTextFilters, appliedFilters);
    const multipleSelectTextCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, multipleSelectTextFilters, start, length));
    let highlightTextFilters = {
      'flt.resourceFormat': 'hot_text_highlight_question'
    };
    highlightTextFilters = Object.assign(highlightTextFilters, appliedFilters);
    const highlightTextCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, highlightTextFilters, start, length));
    let dragAndDropOrderFilters = {
      'flt.resourceFormat': 'hot_text_reorder_question'
    };
    dragAndDropOrderFilters = Object.assign(dragAndDropOrderFilters, appliedFilters);
    const dragAndDropOrderCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, dragAndDropOrderFilters, start, length));

    let openEndedQuestionFilters = {
      'flt.resourceFormat': 'open_ended_question'
    };
    openEndedQuestionFilters = Object.assign(openEndedQuestionFilters, appliedFilters);
    const openEndedQuestionCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(term, openEndedQuestionFilters, start, length));


    const culacCountPromise = component.get('activityService').getLearningMaps(appliedFilters, term);

    return Ember.RSVP.hash({
      webpageCount: webpageCountPromise,
      audioCount: audioCountPromise,
      videoCount: videoCountPromise,
      imageCount: imageCountPromise,
      textCount: textCountPromise,
      interactiveCount: interactiveCountPromise,
      multipleChoiceCount: multipleChoiceCountPromise,
      multipleAnswerCount: multipleAnswerCountPromise,
      trueOrFalseCount: trueOrFalseCountPromise,
      fillInTheBlankCount: fillInTheBlankCountPromise,
      multipleSelectImageCount: multipleSelectImageCountPromise,
      multipleSelectTextCount: multipleSelectTextCountPromise,
      highlightTextCount: highlightTextCountPromise,
      dragAndDropOrderCount: dragAndDropOrderCountPromise,
      openEndedQuestionCount: openEndedQuestionCountPromise,
      culacCount: culacCountPromise
    }).then((hash) => {
      let resourceCounts = Ember.A([{
        'name': 'Audio',
        'value': hash.audioCount.get('hitCount'),
        'colorCode': '#76C8BC'
      }, {
        'name': 'Videos',
        'value': hash.videoCount.get('hitCount'),
        'colorCode': '#3EB6A6'
      }, {
        'name': 'Interactive',
        'value': hash.interactiveCount.get('hitCount'),
        'colorCode': '#76C8BC'
      }, {
        'name': 'Images',
        'value': hash.imageCount.get('hitCount'),
        'colorCode': '#76C8BC'
      }, {
        'name': 'Webpages',
        'value': hash.webpageCount.get('hitCount'),
        'colorCode': '#009A87'
      }, {
        'name': 'Text',
        'value': hash.textCount.get('hitCount'),
        'colorCode': '#76C8BC'
      }]);
      component.set('resources', resourceCounts);

      let questionCounts = Ember.A([{
        'name': 'Multiple Choice',
        'value': hash.multipleChoiceCount.get('hitCount'),
        'colorCode': '#3A434D'
      }, {
        'name': 'Multiple Answer',
        'value': hash.multipleAnswerCount.get('hitCount'),
        'colorCode': '#6E767D'
      }, {
        'name': 'True Or False',
        'value': hash.trueOrFalseCount.get('hitCount'),
        'colorCode': '#93999E'
      }, {
        'name': 'Fill In The Blank',
        'value': hash.fillInTheBlankCount.get('hitCount'),
        'colorCode': '#3A434D'
      }, {
        'name': 'Multiple Select - Image',
        'value': hash.multipleSelectImageCount.get('hitCount'),
        'colorCode': '#3A434D'
      }, {
        'name': 'Multiple Select - Text',
        'value': hash.multipleSelectTextCount.get('hitCount'),
        'colorCode': '#93999E'
      }, {
        'name': 'Highlight Text',
        'value': hash.highlightTextCount.get('hitCount'),
        'colorCode': '#93999E'
      }, {
        'name': 'Drag And Drop Order',
        'value': hash.dragAndDropOrderCount.get('hitCount'),
        'colorCode': '#3A434D'
      }, {
        'name': 'Open Ended',
        'value': hash.openEndedQuestionCount.get('hitCount'),
        'colorCode': '#3A434D'
      }]);
      component.set('questions', questionCounts);

      // CULCA
      let courseCounts = hash.culacCount.get('course').get('totalHitCount');
      let unitCounts = hash.culacCount.get('unit').get('totalHitCount');
      let lessonCounts = hash.culacCount.get('lesson').get('totalHitCount');
      let collectionCounts = hash.culacCount.get('collection').get('totalHitCount');
      let assessmentCounts = hash.culacCount.get('assessment').get('totalHitCount');
      let culcaCounts = Ember.A([{
        'name': 'courses',
        'value': courseCounts
      }, {
        'name': 'units',
        'value': unitCounts
      }, {
        'name': 'lessons',
        'value': lessonCounts
      }, {
        'name': 'collections',
        'value': collectionCounts
      }, {
        'name': 'assessments',
        'value': assessmentCounts
      }]);

      component.set('culcaCounts', culcaCounts);

      component.set('isLoading', false);
    });
  },

  /**
   * @function getAppliedFilters
   * Get user applied filters from the local storage
   */
  getAppliedFilters() {
    let controller = this;
    let userId = controller.get('session.id');
    let appliedFilters = JSON.parse(localStorage.getItem(`research_${userId}_activities_filters`));
    let filterTypes = ACTIVITY_FILTER;
    let formattedFilters = {};
    if (appliedFilters) {
      filterTypes.map( filterTypeInfo => {
        let filterType = filterTypeInfo.code;
        let categorizedFilter = appliedFilters[`${filterType}`] || null;
        if (categorizedFilter) {
          formattedFilters = Object.assign(formattedFilters, controller.getFormattedSearchFilters(filterType, categorizedFilter));
        }
      });
    }
    return formattedFilters;
  },

  /**
   * @function getFormattedSearchFilters
   * Get formatted filters
   */
  getFormattedSearchFilters(filterType, categorizedFilterData) {
    let controller = this;
    let formattedFilters = {};
    let delimiter = ',';
    switch (filterType) {
    case 'subject':
      categorizedFilterData.map( filterData => {
        formattedFilters['flt.subjectName'] = filterData.label;
      });
      break;
    case 'course':
      delimiter = '~~';
      formattedFilters['flt.courseName'] = controller.getConcatenatedFilterString(categorizedFilterData, delimiter);
      break;
    case 'audience':
      formattedFilters['flt.audience'] = controller.getConcatenatedFilterString(categorizedFilterData);
      break;
    case '21-century-skills':
      delimiter = '~~';
      formattedFilters['flt.21CenturySkills'] = controller.getConcatenatedFilterString(categorizedFilterData, delimiter);
      break;
    case 'licenses':
      delimiter = ',';
      formattedFilters['flt.licenseCode'] = controller.getConcatenatedFilterString(categorizedFilterData, delimiter, 'id');
      break;
    case 'dok':
      formattedFilters['flt.dok'] = controller.getConcatenatedFilterString(categorizedFilterData);
      break;
    case 'publisher':
      delimiter = '~~';
      formattedFilters['flt.publisher'] = controller.getConcatenatedFilterString(categorizedFilterData, delimiter);
      break;
    }
    return formattedFilters;
  },

  /**
   * @function getConcatenatedFilterString
   * Get search filter using applied filters
   */
  getConcatenatedFilterString( filterInfo, delimiter = ',', keyName = 'label' ) {
    let label = '';
    if (Ember.isArray(filterInfo)) {
      filterInfo.map( filterData => {
        label += delimiter + filterData[`${keyName}`] ;
      });
      let numOfCharsRemove = delimiter === ',' ? 1 : 2;
      return label.substring(numOfCharsRemove);
    }
    return label;
  }
});
