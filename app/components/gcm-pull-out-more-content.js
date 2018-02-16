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
  * User selected node data
  */
  prerequisites: null,

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
    let filters = nodeData.filters;
    let q = '*';
    let start = 1;
    let resourcePromise = Ember.RSVP.resolve(component.get('searchService').searchResources(q, filters, start, searchLength));
    let collectionPromise = Ember.RSVP.resolve(component.get('searchService').searchCollections(q, filters, start, searchLength));
    let assessmentPromise = Ember.RSVP.resolve(component.get('searchService').searchAssessments(q, filters, start, searchLength));
    let questionPromise = Ember.RSVP.resolve(component.get('searchService').searchQuestions(q, filters, start, searchLength));
    return Ember.RSVP.hash({
      resourceContent: resourcePromise,
      collectionContent: collectionPromise,
      assessmentContent: assessmentPromise,
      questionContent: questionPromise
    }).then(function(hash) {
      component.set('resourceContent', hash.resourceContent.searchResults);
      component.set('collectionContent', hash.collectionContent.searchResults);
      component.set('assessmentContent', hash.assessmentContent.searchResults);
      component.set('questionContent', hash.questionContent.searchResults);
    });
  })
});
