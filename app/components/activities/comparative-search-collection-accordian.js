import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['comparative-search-collection-accordian'],

  // ---------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:content
   */
  contentService: Ember.inject.service('api-sdk/content'),

  // ----------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} activity hold the single activity details
   */
  activity: null,

  /**
   * @property {Array} activityQuestions hold the acitivity data
   */

  activityContent: [],

  /**
   * @property {Boolean} isExpanded controll the eye icon to arrow up
   */
  isExpanded: false,

  // ---------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action trigger when click collection or assessment
     */
    onToggleActivity(content) {
      let component = this;
      component.toggleProperty('isExpanded');
      if (component.get('isExpanded')) {
        component.getContentById(content);
      }
      component
        .$('.comparative-gooru-collection-accordian-panel')
        .slideToggle(500);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    let component = this;
    component.handleShowMoreData();
  },
  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function getContentById method used to get assessment or collection details
   */

  getContentById(content) {
    let component = this;
    if (content.type === 'collection') {
      component
        .get('contentService')
        .getCollectionById(content.get('id'))
        .then(activityData => {
          component.set('activityContent', activityData.content);
        });
    } else if (content.type === 'assessment') {
      component
        .get('contentService')
        .getAssessmentById(content.get('id'))
        .then(activityData => {
          component.set('activityContent', activityData.question);
        });
    }
  },

  /**
   * @function handleShowMoreData used to load more data while scroll
   */
  handleShowMoreData() {
    let component = this;
    let loading = false;
    let container = Ember.$('.comparative-gooru-search-card');
    component.$(container).scroll(function() {
      if (!loading) {
        let scrollTop = Ember.$(container).scrollTop();
        let listContainerHeight = Ember.$(container).height() + 1;
        let isScrollReachedBottom =
          scrollTop >=
          component.$(container).prop('scrollHeight') - listContainerHeight;
        if (isScrollReachedBottom) {
          loading = true;
          component.sendAction('paginateNext', { activity: 'activity' });
          loading = false;
        }
      }
    });
  }
});
