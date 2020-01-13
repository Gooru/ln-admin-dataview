import Ember from 'ember';

export default Ember.Component.extend({
  // ----------------------------------------------------------------
  // Attributes

  classNames: ['comparative-search'],

  // --------------------------------------------------------------
  // Dependencies

  searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------
  // Properties

  /**
   * @property {String} hold the search string
   */
  searchTerms: '',

  /**
   * @property {Array} googleSearchContent hold google search contents
   */
  googleSearchContent: [],

  /**
   * @property {Array} bingSearchContent hold bing search contents
   */
  bingSearchContent: [],

  /**
   * @property {Array} gooruSearchContent hold gooru search contents
   */
  gooruSearchContent: [],

  /**
   * @property {Boolean} isLoading checking api response
   */
  isLoading: false,

  /**
   * @property {Boolean} isPersonalize is checking personalize or not
   */
  isPersonalize: false,

  /**
   * @property {Array} gradeList is hold grade list
   */
  gradeList: [],

  /**
   * @property {Boolean} isPageLoading checking api response
   */
  isPageLoading: false,

  // --------------------------------------------------------------
  // Action
  actions: {
    /**
     * Action trigger when click on back arrow
     */
    backToCatalog() {
      this.sendAction('backToCatalog');
    },

    /**
     * Action trigger when click search button
     */
    onSearchTerms(searchTerms) {
      let component = this;
      component.set('searchTerms', searchTerms);
      component.set('googleSearchContent', []);
      component.set('bingSearchContent', []);
      component.set('gooruSearchContent', []);
      component.gooruSearchTermsContent(searchTerms);
      component.googleSearchTermsContent(searchTerms);
      component.bingSearchTermsContent(searchTerms);
    },

    /**
     * Action trigger when scroll content
     */
    paginateNext(content) {
      let component = this;
      let maxTotalHitCount = component.get('gooruSearchContent')
        .maxTotalHitCount;
      let startAt = content.startAt;
      if (content.activity === 'activity' && startAt < maxTotalHitCount) {
        component.gooruSearchTermsContent(
          component.get('searchTerms'),
          content
        );
      } else if (content.activity === 'google') {
        component.googleSearchTermsContent(
          component.get('searchTerms'),
          content
        );
      } else if (content.activity === 'bing') {
        component.bingSearchTermsContent(component.get('searchTerms'), content);
      }
    },

    /**
     * Action trigger when click user in personalize grade list
     */
    onSelectGrade(grade) {
      let component = this;
      let searchTerms = component.get('searchTerms');
      component.set('isPersonalize', false);
      component.set('gradeList', []);
      if (grade) {
        component.set('isPersonalize', true);
        component.set('gradeList', grade.get('gradeCode'));
      }
      if (searchTerms) {
        component.set('gooruSearchContent', []);
        component.gooruSearchTermsContent(searchTerms);
      }
    }
  },

  // -------------------------------------------------------------
  // Methods

  /**
   * @function gooruSearchTermsContent
   */
  gooruSearchTermsContent(searchTerms, content = null) {
    let component = this;
    component.set('isPageLoading', true);
    let startAt = content ? content.startAt : 0;
    let gradeList = component.get('gradeList');
    let params = {
      q: searchTerms,
      startAt: startAt,
      length: 10
    };
    params['flt.hasStandard'] = 1;
    if (component.get('isPersonalize')) {
      params['flt.course'] = gradeList ? gradeList.toString() : '';
    }
    Ember.RSVP.hash({
      gooruSearch: component.get('searchService').comparativeSearch(params)
    }).then(({ gooruSearch }) => {
      component.set('gooruSearchContent', gooruSearch);
      component.set('isLoading', false);
      component.set('isPageLoading', false);
    });
  },

  /**
   * @function googleSearchTermsContent
   */
  googleSearchTermsContent(searchTerms, content = null) {
    let component = this;
    let startAt = content ? content.startAt : 1;
    component
      .get('searchService')
      .googleSearch(searchTerms, startAt)
      .then(googleSearch => {
        let googleSearchContent = component.get('googleSearchContent');
        googleSearchContent = googleSearchContent.concat(googleSearch);
        component.set('googleSearchContent', googleSearchContent);
        component.set('isLoading', false);
      });
  },

  /**
   * @function bingSearchTermsContent
   */
  bingSearchTermsContent(searchTerms, content = null) {
    let component = this;
    let startAt = content ? content.startAt : 1;
    component
      .get('searchService')
      .bingSearch(searchTerms, startAt)
      .then(bingSearch => {
        let bingSearchContent = component.get('bingSearchContent');
        bingSearchContent = bingSearchContent.concat(bingSearch);
        component.set('bingSearchContent', bingSearchContent);
        component.set('isLoading', false);
      });
  }
});
