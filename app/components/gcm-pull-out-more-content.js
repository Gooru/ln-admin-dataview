import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gcm-pull-out-more-content'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
  * Search service to fetch content details
  */
  searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------------------
  // Properties
  /**
  * User selected node data
  */
  nodeData: null,

  /**
  * Search length for fetching search items
  */
  searchLength: 3,

  /**
  * List of resource contents
  */
  resourceContent: null,

  /**
  * List of collection contents
  */
  collectionContent: null,

  /*
  * List of assessment contents
  */
  assessmentContent: null,

  /*
  * List of question contents
  */
  questionContent: null,

  // -------------------------------------------------------------------------
  // Events
  /**
  * Trigger observer when user select a node
  */
  nodeDataObserver: Ember.observer('nodeData', function() {
    let component = this;
    component._super(...arguments);
    const searchLength = component.get('searchLength');
    let nodeData = component.get('nodeData');
    let resourcePromise = Ember.RSVP.resolve(component.get('searchService').getResourceContent(nodeData, searchLength));
    let collectionPromise = Ember.RSVP.resolve(component.get('searchService').getCollectionContent(nodeData, searchLength));
    let assessmentPromise = Ember.RSVP.resolve(component.get('searchService').getAssessmentContent(nodeData, searchLength));
    let questionPromise = Ember.RSVP.resolve(component.get('searchService').getQuestionContent(nodeData, searchLength));
    return Ember.RSVP.hash({
      resourceContent: resourcePromise,
      collectionContent: collectionPromise,
      assessmentContent: assessmentPromise,
      questionContent: questionPromise
    }).then(function(hash) {
      console.log('hash in more content', hash);
      component.set('resourceContent', hash.resourceContent);
      component.set('collectionContent', hash.collectionContent);
      component.set('assessmentContent', hash.assessmentContent);
      component.set('questionContent', hash.questionContent);
    });
  })
});
