import Ember from 'ember';

export default Ember.Controller.extend({


  //------------------------------------------------------------------------
  //Dependencies


  /**
   * Search service to fetch content details
   */
  contentService: Ember.inject.service('api-sdk/content'),


  /**
   * @requires service:profile
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  //-------------------------------------------------------------------------
  //Properties


  /**
   * show pull out .
   * @type {boolean}
   */
  showPullOut: false,

  /**
   * pull out show more options  .
   * @type {boolean}
   */
  showMore: true,


  /**
   * Show loading spinner
   */
  isLoading: false,

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Action triggered when the user invoke the collection in pull out.
     */
    getResourceInfo: function() {
      let controller = this;
      controller.set('isLoading', true);
      controller.set('showPullOut', true);
      let collectionType = 'resource';
      const resourceId = '2d83f8ab-787e-4d8a-8fd5-fc490a3c650a';
      return controller.get('contentService').getContentResourceById(resourceId)
        .then(function(collection) {
          return controller.get('profileService').readUserProfile(collection.creator_id)
            .then(function(owner) {
              collection.set('owner', owner);
              controller.set('collection', collection);
              controller.set('collection.type', collectionType);
              controller.set('isLoading', false);
              return Ember.RSVP.resolve(collection);
            });
        });
    }
  }

});
