import Ember from 'ember';

export default Ember.Component.extend({
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
   * @property {Boolean} isLoading checking is content loading or not
   */
  isLoading: false,

  /**
   * @property {Number} startAt
   */
  startAt: 0,

  /**
   * @property {Number} length
   */
  length: 10,

  // --------------------------------------------------------------
  // Action
  actions: {
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
      if (content.activity === 'activity' && !component.get('isLoading')) {
        component.set('isLoading', true);
        component.gooruSearchTermsContent(component.get('searchTerms'));
      }
    }
  },

  // -------------------------------------------------------------
  // Methods

  /**
   * @function gooruSearchTermsContent
   */
  gooruSearchTermsContent(searchTerms) {
    let component = this;
    let startAt = component.get('startAt');
    let length = component.get('length');
    Ember.RSVP.hash({
      gooruSearch: component
        .get('searchService')
        .comparativeSearch(searchTerms, startAt, length)
    }).then(({ gooruSearch }) => {
      component.set('gooruSearchContent', gooruSearch);
      component.set('startAt', startAt + length);
      Ember.run.later(function() {
        component.set('isLoading', false);
      }, 5000);
    });
  },

  /**
   * @function bingSearchTermsContent
   */
  bingSearchTermsContent(searchTerms) {
    let component = this;
    component
      .get('searchService')
      .googleSearch(searchTerms)
      .then(googleSearch => {
        component.set('googleSearchContent', googleSearch);
      });
  },

  /**
   * @function googleSearchTermsContent
   */
  googleSearchTermsContent(searchTerms) {
    let component = this;
    component
      .get('searchService')
      .bingSearch(searchTerms)
      .then(bingSearch => {
        component.set('bingSearchContent', bingSearch);
      });
  }
});
