import Ember from 'ember';

export default Ember.Component.extend({
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
  },

  didRender() {
    let component = this;
    component.handleShowMoreData();
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
      let selectedAssessment = component.mixSelectedActivities(
        activityContents.assessment
      );
      let selectedCollection = component.mixSelectedActivities(
        activityContents.collection
      );
      let selectedOfflineActivity = component.mixSelectedActivities(
        activityContents.offlineActivity
      );
      let otherResourse = component.mixOtherActivities(
        activityContents.resource
      );
      let otherAssessment = component.mixOtherActivities(
        activityContents.assessment
      );
      let otherCollection = component.mixOtherActivities(
        activityContents.collection
      );
      let otherOfflineActivity = component.mixOtherActivities(
        activityContents.offlineActivity
      );

      activityList = [
        ...selectedResourse,
        ...selectedAssessment,
        ...selectedCollection,
        ...selectedOfflineActivity
      ];

      let mixActivity = [
        ...otherResourse,
        ...otherAssessment,
        ...otherCollection,
        ...otherOfflineActivity
      ];
      activityList = activityList.concat(component.shuffle(mixActivity));
      component.set('sortedContents', sortedContents.concat(activityList));
    } else {
      let mixActivity = [
        ...activityContents.resource,
        ...activityContents.assessment,
        ...activityContents.collection,
        ...activityContents.offlineActivity
      ];
      activityList = activityList.concat(component.shuffle(mixActivity));
      component.set('sortedContents', sortedContents.concat(activityList));
    }
    component.set('startAt', startAt + length);
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
          let startAt = component.get('startAt');
          component.sendAction('paginateNext', {
            activity: 'activity',
            startAt: startAt
          });
          loading = false;
        }
      }
    });
  },

  mixSelectedActivities(content) {
    return content.length > 4 ? content.slice(0, 4) : content;
  },

  mixOtherActivities(content) {
    return content.length > 4 ? content.slice(4, content.length) : [];
  },

  shuffle(content) {
    return content.sort(() => Math.random() - 0.5);
  }
});
