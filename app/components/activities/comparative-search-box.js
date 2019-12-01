import Ember from 'ember';

/**
 * Component for comparative search box
 */
export default Ember.Component.extend({
  classNames: ['comparative-search-box'],

  // --------------------------------------------------------------
  // Properties

  /**
   * @property {string} searchTerms hold search string
   */
  searchTerms: '',

  // --------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action trigger when click search button icon
     */
    onSearchTerms() {
      let component = this;
      let searchTerms = component.get('searchTerms');
      if (searchTerms) {
        component.sendAction('onSearchTerms', searchTerms);
      }
    },

    /**
     * Action trigger when click on back arrow
     */
    backToCatalog() {
      this.sendAction('backToCatalog');
    }
  }
});
