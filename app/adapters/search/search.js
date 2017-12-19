import Ember from 'ember';

/**
 * Adapter to support the Search for Collections, Assessments, Resources and Questions
 *
 * @typedef {Object} SearchAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/gooru-search/rest/v2/search',

  /**
   * Fetches the collections that match with the node
   *
   * @param nodeData
   * @returns {Promise.<Collection[]>}
   */
  searchCollections: function(nodeData) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let filterType = `flt.${nodeData.type}Name`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        'flt.collectionType': 'collection',
        length: 1
      }
    };
    if (nodeData.name) {
      options.data[`${filterType}`] = nodeData.name;
    }
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the assessments that match with the node
   *
   * @param nodeData the term to search
   * @returns {Promise.<Assessment[]>}
   */
  searchAssessments: function(nodeData) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let filterType = `flt.${nodeData.type}Name`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: 1,
        'flt.collectionType': 'assessment'
      }
    };
    if (nodeData.name) {
      options.data[`${filterType}`] = nodeData.name;
    }
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the resources that match with the node
   *
   * @param nodeData the term to search
   * @returns {Promise.<Resource[]>}
   */
  searchResources: function(nodeData) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let filterType = `flt.${nodeData.type}Name`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: 1,
        'flt.contentFormat': 'resource'
      }
    };
    if (nodeData.name) {
      options.data[`${filterType}`] = nodeData.name;
    }
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the questions that match with the node
   *
   * @param nodeData the term to search
   * @returns {Promise.<Question[]>}
   */
  searchQuestions: function(nodeData) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let filterType = `flt.${nodeData.type}Name`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: 1,
        'flt.resourceFormat': 'question'
      }
    };
    if (nodeData.name) {
      options.data[`${filterType}`] = nodeData.name;
    }
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches courses that match with the node
   *
   * @param nodeData the term to search
   * @returns {Promise.<Course[]>}
   */
  searchCourses: function(nodeData) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/course`;
    let filterType = `${nodeData.type}Name`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: 1
      }
    };
    if (nodeData.name) {
      options.data[`${filterType}`] = nodeData.name;
    }
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches rubrics that match with the node
   *
   * @param nodeData the term to search
   * @returns {Promise.<Course[]>}
   */
  searchRubrics: function(nodeData) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/rubric`;
    let filterType = `${nodeData.type}Name`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: 1
      }
    };
    if (nodeData.name) {
      options.data[`${filterType}`] = nodeData.name;
    }
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
