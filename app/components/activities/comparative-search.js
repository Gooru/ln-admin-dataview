import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['comparative-search'],

  // --------------------------------------------------------------
  // Dependencies

  searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------
  // Properties

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

  // --------------------------------------------------------------
  // Action
  actions: {
    /**
     * Action trigger when click search button
     */
    onSearchTerms(searchTerms) {
      let component = this;
      component.set('gooruSearchContent', []);
      component.searchTermsContent(searchTerms);
    }
  },

  // -------------------------------------------------------------
  // Methods

  /**
   * @function searchTermsContent
   */
  searchTermsContent(searchTerms) {
    let component = this;
    Ember.RSVP.hash({
      googleSearch: component.get('searchService').googleSearch(searchTerms),
      bingSearch: component.get('searchService').bingSearch(searchTerms),
      gooruSearch: component.get('searchService').comparativeSearch(searchTerms)
    }).then(({ googleSearch, bingSearch, gooruSearch }) => {
      component.set('googleSearchContent', googleSearch);
      component.set('bingSearchContent', bingSearch);
      component.set('gooruSearchContent', gooruSearch);
    });
  }
});
