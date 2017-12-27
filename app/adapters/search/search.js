import Ember from 'ember';
import {TAXONOMY_LEVELS} from 'admin-dataview/config/config';
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
  searchCollections: function(nodeData, length) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let nodeType = nodeData.type;
    let filterType = nodeType === TAXONOMY_LEVELS.STANDARD ? `flt.${nodeType}Display` : `flt.${nodeType}Name`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: length,
        'flt.collectionType': 'collection',
        'flt.publishStatus': 'published,unpublished'
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
  searchAssessments: function(nodeData, length) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let nodeType = nodeData.type;
    let filterType = nodeType === TAXONOMY_LEVELS.STANDARD ? `flt.${nodeType}Display` : `flt.${nodeType}Name`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: length,
        'flt.collectionType': 'assessment',
        'flt.publishStatus': 'published,unpublished'
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
  searchResources: function(nodeData, length = 1) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let nodeType = nodeData.type;
    let filterType = nodeType === TAXONOMY_LEVELS.STANDARD ? `flt.${nodeType}Display` : `flt.${nodeType}Name`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: length,
        'flt.contentFormat': 'resource',
        'flt.publishStatus': 'published,unpublished'
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
  searchQuestions: function(nodeData, length) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let nodeType = nodeData.type;
    let filterType = nodeType === TAXONOMY_LEVELS.STANDARD ? `flt.${nodeType}Display` : `flt.${nodeType}Name`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: length,
        'flt.resourceFormat': 'question',
        'flt.publishStatus': 'published,unpublished'
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
    let nodeType = nodeData.type;
    let filterType = nodeType === TAXONOMY_LEVELS.STANDARD ? `${nodeType}Display` : `${nodeType}Name`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        start: 3,
        length: 10,
        'publishStatus': 'published,unpublished'
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
    let nodeType = nodeData.type;
    let filterType = nodeType === TAXONOMY_LEVELS.STANDARD ? `${nodeType}Display` : `${nodeType}Name`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: '*',
        length: 1,
        'publishStatus': 'published,unpublished'
      }
    };
    if (nodeData.name) {
      options.data[`${filterType}`] = nodeData.name;
    }
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }
});