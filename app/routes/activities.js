import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * Search service to fetch content details
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * Session Service
   */
  session: Ember.inject.service('session'),

  //-------------------------------------------------------------------------
  //Properties


  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    return this.getSearchContentCount();
  },

  /**
   * Get Content count of search results
   * return hashed json of each content type conunt
   */
  getSearchContentCount: function() {
    let webpageFilters = {'flt.resourceFormat' : 'webpage'};
    const webpageCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(webpageFilters, 1));
    let audioFilters = {'flt.resourceFormat' : 'audio'};
    const audioCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(audioFilters, 1));
    let videoFilters = {'flt.resourceFormat' : 'video'};
    const videoCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(videoFilters, 1));
    let imageFilters = {'flt.resourceFormat' : 'image'};
    const imageCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(imageFilters, 1));
    let interactiveFilters = {'flt.resourceFormat' : 'interactive'};
    const interactiveCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(interactiveFilters, 1));
    let textFilters = {'flt.resourceFormat' : 'text'};
    const textCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(textFilters, 1));
    const questionCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions());
    return Ember.RSVP.hash({
      questionCount: questionCountPromise,
      webpageCount: webpageCountPromise,
      audioCount: audioCountPromise,
      videoCount: videoCountPromise,
      imageCount: imageCountPromise,
      textCount: textCountPromise,
      interactiveCount: interactiveCountPromise
    }).then((hash) => {
      let contentCounts = Ember.A([{
        'name': 'Audio',
        'value': hash.audioCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Videos',
        'value': hash.videoCount,
        'colorCode': '#6E767D'
      }, {
        'name': 'Interactive',
        'value': hash.interactiveCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Images',
        'value': hash.imageCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Questions',
        'value': hash.questionCount,
        'colorCode': '#93999E'
      }, {
        'name': 'Webpages',
        'value': hash.webpageCount,
        'colorCode': '#3A434D'
      }, {
        'name': 'Text',
        'value': hash.textCount,
        'colorCode': '#93999E'
      }]);
      return Ember.RSVP.hash({
        contentCounts: contentCounts
      });
    });
  },

  setupController: function(controller, model) {
    let route = this;
    controller.set('contentCounts', model.contentCounts);
    let userId = route.get('session.id');
  }

});
