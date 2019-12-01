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
      if (
        content.activity === 'activity' &&
        !component.get('isLoading') &&
        startAt < maxTotalHitCount
      ) {
        component.set('isLoading', true);
        component.gooruSearchTermsContent(
          component.get('searchTerms'),
          content
        );
      } else if (content.activity === 'google' && !component.get('isLoading')) {
        component.set('isLoading', true);
        component.googleSearchTermsContent(
          component.get('searchTerms'),
          content
        );
      } else if (content.activity === 'bing' && !component.get('isLoading')) {
        component.set('isLoading', true);
        component.bingSearchTermsContent(component.get('searchTerms'), content);
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
    let startAt = content ? content.startAt : 0;
    Ember.RSVP.hash({
      gooruSearch: component
        .get('searchService')
        .comparativeSearch(searchTerms, startAt)
    }).then(({ gooruSearch }) => {
      component.set('gooruSearchContent', gooruSearch);
      Ember.run.later(function() {
        component.set('isLoading', false);
      }, 5000);
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
      .googleSearch(searchTerms, startAt)
      .then(googleSearch => {
        let googleSearchContent = component.get('googleSearchContent');
        googleSearchContent = googleSearchContent.concat(googleSearch);
        component.set('googleSearchContent', googleSearchContent);
        Ember.run.later(function() {
          component.set('isLoading', false);
        }, 5000);
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
      .bingSearch(searchTerms, startAt)
      .then(bingSearch => {
        let bingSearchContent = component.get('bingSearchContent');
        bingSearchContent = bingSearchContent.concat(bingSearch);
        component.set('bingSearchContent', bingSearchContent);
        Ember.run.later(function() {
          component.set('isLoading', false);
        }, 5000);
      });
  }
});
