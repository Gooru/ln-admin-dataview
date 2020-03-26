import Ember from 'ember';

export default Ember.Component.extend({
  // ----------------------------------------------------------------
  // Attributes
  classNames: ['comparative-gooru-search-card'],

  // ----------------------------------------------------
  // Properties
  /**
   * @@property {Array} activityContents hold the activity contents
   */
  activityContents: [],

  /**
   * @property {Array} sortedContents this property hold the sorted activity
   */
  sortedContents: [],

  /**
   * @property {Number} startAt
   */
  startAt: 0,

  /**
   * @property {Number} length
   */
  length: 10,

  /**
   * @property {Boolean} isLoading checking api response
   */
  isLoading: false,

  /**
   * Watching activity data changes
   */
  watchingActivityContent: Ember.observer('activityContents', function() {
    this.sortGooruSearch();
  }),

  // --------------------------------------------------------------
  // Hooks

  didInsertElement() {
    this.set('sortedContents', []);
    this.sortGooruSearch();
    this.handleShowMoreData();
  },

  // -----------------------------------------------------------------------
  // Actions

  // -----------------------------------------------------------
  // Methods

  /**
   * @function sortGooruSearch used to sort gooru search result
   */
  sortGooruSearch() {
    let component = this;
    let startAt = component.get('startAt');
    let length = component.get('length');
    let activityContents = component.get('activityContents');
    let sortedContents = component.get('sortedContents');
    let activityList = [];
    if (sortedContents.length === 0) {
      let selectedResourse = component.mixSelectedActivities(
        activityContents.resource
      );
      let selectedQuestion = component.mixSelectedActivities(
        activityContents.question
      );
      let selectedAssessment = component.mixSelectedActivities(
        activityContents.assessment
      );
      let selectedCollection = component.mixSelectedActivities(
        activityContents.collection
      );
      let selectedOfflineActivity = component.mixSelectedActivities(
        activityContents.offlineActivity
      );
      activityList = [
        ...selectedCollection,
        ...selectedAssessment,
        ...selectedOfflineActivity,
        ...selectedResourse,
        ...selectedQuestion
      ];
      component.set('sortedContents', sortedContents.concat(activityList));
    }
    this.shuffleContainer();
    component.set('startAt', startAt + length);
  },

  /**
   * @function handleShowMoreData used to load more data while scroll
   */
  handleShowMoreData() {
    let component = this;
    let loading = component.get('isLoading');
    let container = Ember.$('.comparative-gooru-search-card');
    component.$(container).scroll(function() {
      if (!loading) {
        let scrollTop = Ember.$(container).scrollTop();
        let listContainerHeight = Ember.$(container).height() + 1;
        let isScrollReachedBottom =
          scrollTop >=
          component.$(container).prop('scrollHeight') - listContainerHeight;
        if (isScrollReachedBottom) {
          component.set('isLoading', true);
          let startAt = component.get('startAt');
          component.sendAction('paginateNext', {
            activity: 'activity',
            startAt: startAt
          });
        }
      }
    });
  },

  /**
   * @function mixSelectedActivities used to mix selected activity data
   */
  mixSelectedActivities(content) {
    return content.length ? [content.shift()] : [];
  },

  /**
   * @function mixOtherActivities used to mix other activity data
   */
  mixOtherActivities(content) {
    return content.length > 1
      ? content.splice(0, 2)
      : content.length
        ? [content.shift()]
        : [];
  },

  /**
   * @function shuffle used to suffle acitivity datas
   */
  shuffleContainer() {
    let activityContents = this.get('activityContents');
    let sortedContents = this.get('sortedContents');

    if (
      activityContents.assessment.length ||
      activityContents.collection.length ||
      activityContents.question.length ||
      activityContents.resource.length
    ) {
      let otherCollection = this.mixOtherActivities(
        activityContents.collection
      );
      let otherAssessment = this.mixOtherActivities(
        activityContents.assessment
      );
      let otherQuestion = this.mixOtherActivities(activityContents.question);
      let otherResourse = this.mixOtherActivities(activityContents.resource);
      let otherOfflineActivity = this.mixOtherActivities(
        activityContents.offlineActivity
      );
      let result = [
        ...otherCollection,
        ...otherAssessment,
        ...otherOfflineActivity,
        ...otherResourse,
        ...otherQuestion
      ];
      this.set('sortedContents', sortedContents.concat(result));
      this.shuffleContainer();
    }
    return false;
  }
});
