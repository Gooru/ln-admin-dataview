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

  // --------------------------------------------------------------
  // Hooks

  didInsertElement() {
    this.sortGooruSearch();
  },

  // -----------------------------------------------------------
  // Methods

  /**
   * @function sortGooruSearch used to sort gooru search result
   */
  sortGooruSearch() {
    let component = this;
    let activityContents = component.get('activityContents');
    let sortedContents = component.get('sortedContents');
    let activityList = [];
    if (sortedContents.length === 0) {
      let firstResourse =
        activityContents.resource.length > 4
          ? activityContents.resource.slice(0, 4)
          : activityContents.resource;
      let secondAssessment =
        activityContents.assessment.length > 4
          ? activityContents.assessment.slice(0, 4)
          : activityContents.assessment;
      let thirdCollection =
        activityContents.collection.length > 4
          ? activityContents.collection.slice(0, 4)
          : activityContents.collection;
      let fourthOfflineActivity =
        activityContents.offlineActivity.length > 4
          ? activityContents.offlineActivity.slice(0, 4)
          : activityContents.offlineActivity;
      activityList = [
        ...firstResourse,
        ...secondAssessment,
        ...thirdCollection,
        ...fourthOfflineActivity
      ];
      component.set('sortedContents', sortedContents.concat(activityList));
    }
  }
});
