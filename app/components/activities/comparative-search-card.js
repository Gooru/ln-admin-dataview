import Ember from 'ember';

export default Ember.Component.extend({
  // -----------------------------------------------------------
  // Attributes

  classNames: ['comparative-search-card'],

  classNameBindings: ['searchCardName'],

  // ----------------------------------------------------------
  // Properties
  /**
   * @property {Array} searchContent hold the search contents
   */
  searchContent: [],

  /**
   * @property {String} searchCardName hold the card name
   */
  searchCardName: '',

  /**
   * @property {Number} startAt
   */
  startAt: 1,

  /**
   * @property {Number} length
   */
  length: 10,

  /**
   * @property {Boolean} isLoading checking api response
   */
  isLoading: false,

  // --------------------------------------------------------------
  // Hooks
  didInsertElement() {
    let component = this;
    component.handleShowMoreData();
  },

  // ----------------------------------------------------------------
  // Methods

  /**
   * @function handleShowMoreData used to load more data while scroll
   */
  handleShowMoreData() {
    let component = this;
    let loading = component.get('isLoading');
    let searchCardName = component.get('searchCardName');
    let container = Ember.$(`.comparative-search-card.${searchCardName}`);
    component.$(container).scroll(function() {
      if (!loading) {
        let scrollTop = Ember.$(container).scrollTop();
        let listContainerHeight = Ember.$(container).height() + 50;
        let isScrollReachedBottom =
          scrollTop >=
          component.$(container).prop('scrollHeight') - listContainerHeight;
        if (isScrollReachedBottom) {
          component.set('isLoading', true);
          let startAt = component.get('startAt') + 10;
          component.sendAction('paginateNext', {
            activity: component.get('searchCardName'),
            startAt: startAt
          });
        }
      }
    });
  }
});
