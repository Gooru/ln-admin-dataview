import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['activities-distribution-by-content'],

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * Search service to fetch content details
   */
  searchService: Ember.inject.service('api-sdk/search'),


  // -------------------------------------------------------------------------
  // Events

  init: function() {
    this._super(...arguments);
    this.getSearchContentCount();
  },

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

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get Content subformat count of search results
   * return hashed json of each content subformats
   */
  getSearchContentCount: function() {
    let term = '*';
    let component = this;
    component.set('isLoading', true);
    // Resources
    let webpageFilters = {
      'flt.resourceFormat': 'webpage'
    };
    const webpageCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, webpageFilters, 1, 1, true));
    let audioFilters = {
      'flt.resourceFormat': 'audio'
    };
    const audioCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, audioFilters, 1, 1, true));
    let videoFilters = {
      'flt.resourceFormat': 'video'
    };
    const videoCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, videoFilters, 1, 1, true));
    let imageFilters = {
      'flt.resourceFormat': 'image'
    };
    const imageCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, imageFilters, 1, 1, true));
    let interactiveFilters = {
      'flt.resourceFormat': 'interactive'
    };
    const interactiveCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, interactiveFilters, 1, 1, true));
    let textFilters = {
      'flt.resourceFormat': 'text'
    };
    const textCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(term, textFilters, 1, 1, true));

    // Questions
    let multipleChoiceFilters = {
      'flt.resourceFormat': 'multiple_choice_question'
    };
    const multipleChoiceCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(multipleChoiceFilters, 1));
    let multipleAnswerFilters = {
      'flt.resourceFormat': 'multiple_answer_question'
    };
    const multipleAnswerCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(multipleAnswerFilters, 1));
    let trueOrFalseFilters = {
      'flt.resourceFormat': 'true_false_question'
    };
    const trueOrFalseCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(trueOrFalseFilters, 1));
    let fillInTheBlankFilters = {
      'flt.resourceFormat': 'fill_in_the_blank_question'
    };
    const fillInTheBlankCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(fillInTheBlankFilters, 1));
    let multipleSelectImageFilters = {
      'flt.resourceFormat': 'hot_spot_image_question'
    };
    const multipleSelectImageCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(multipleSelectImageFilters, 1));
    let multipleSelectTextFilters = {
      'flt.resourceFormat': 'hot_spot_text_question'
    };
    const multipleSelectTextCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(multipleSelectTextFilters, 1));
    let highlightTextFilters = {
      'flt.resourceFormat': 'hot_text_highlight_question'
    };
    const highlightTextCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(highlightTextFilters, 1));
    let dragAndDropOrderFilters = {
      'flt.resourceFormat': 'hot_text_reorder_question'
    };
    const dragAndDropOrderCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(dragAndDropOrderFilters, 1));


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
      dragAndDropOrderCount: dragAndDropOrderCountPromise
    }).then((hash) => {
      let resourceCounts = Ember.A([{
        'name': 'Audio',
        'value': hash.audioCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Videos',
        'value': hash.videoCount,
        'colorCode': '#6E767D'
      }, {
        'name': 'Interactive',
        'value': hash.interactiveCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Images',
        'value': hash.imageCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Webpages',
        'value': hash.webpageCount,
        'colorCode': '#3A434D'
      }, {
        'name': 'Text',
        'value': hash.textCount,
        'colorCode': '#93999E'
      }]);
      component.set('resources', resourceCounts);

      let questionCounts = Ember.A([{
        'name': 'Multiple Choice',
        'value': hash.multipleChoiceCount,
        'colorCode': '#3A434D'
      }, {
        'name': 'Multiple Answer',
        'value': hash.multipleAnswerCount,
        'colorCode': '#6E767D'
      }, {
        'name': 'True Or False',
        'value': hash.trueOrFalseCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Fill In The Blank',
        'value': hash.fillInTheBlankCount,
        'colorCode': '#3A434D'
      }, {
        'name': 'Multiple Select - Image',
        'value': hash.multipleSelectImageCount,
        'colorCode': '#3A434D'
      }, {
        'name': 'Multiple Select - Text',
        'value': hash.multipleSelectTextCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Highlight Text',
        'value': hash.highlightTextCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Drag And Drop Order',
        'value': hash.dragAndDropOrderCount,
        'colorCode': '#3A434D'
      }]);
      component.set('questions', questionCounts);
      component.set('isLoading', false);
    });
  }

});
