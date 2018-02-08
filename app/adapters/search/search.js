import Ember from 'ember';


/**
 * Adapter to support the Search for Collections, Assessments, Resources and Questions
 *
 * @typedef {Object} SearchAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/gooru-search/rest/v2/search',

  namespace1: '/gooru-search/rest/v1/pedagogy-search/learning-maps',

  /**
   * Fetches the collections that match with the node
   *
   * @param filters
   * @returns {Promise.<Collection[]>}
   */
  searchCollections: function(filters = {}, length = 1) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let defaultData = {
      q: '*',
      length: length,
      'flt.collectionType': 'collection'
    };
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultData, filters);

    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the assessments that match with the node
   *
   * @param filters
   * @returns {Promise.<Assessment[]>}
   */
  searchAssessments: function(filters = {}, length = 1) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let defaultData =  {
      q: '*',
      length: length,
      'flt.collectionType': 'assessment'
    };
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultData, filters);
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the resources that match with the node
   *
   * @param filters
   * @returns {Promise.<Resource[]>}
   */
  searchResources: function(filters = {}, length = 1) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let defaultData =  {
      q: '*',
      length: length,
      'flt.contentFormat': 'resource'
    };
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultData, filters);

    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the questions that match with the node
   *
   * @param filters
   * @returns {Promise.<Question[]>}
   */
  searchQuestions: function(filters = {}, length = 1) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let defaultData =  {
      q: '*',
      length: length,
      'flt.resourceFormat': 'question'
    };
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultData, filters);
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches courses that match with the node
   *
   * @param filters
   * @returns {Promise.<Course[]>}
   */
  searchCourses: function(filters = {}, length = 10) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/course`;
    let defaultData =  {
      q: '*',
      length: length
    };
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultData, filters);
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches rubrics that match with the node
   *
   * @param nodeData the term to search
   * @returns {Promise.<Course[]>}
   */
  searchRubrics: function(filters = {}, length = 1) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/rubric`;
    let defaultData =  {
      q: '*',
      length: length
    };
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultData, filters);
    return Ember.$.ajax(url, options);
  },


  /**
   * Fetches rubrics that match with the node
   *
   * @param filters
   * @returns {Promise.<Course[]>}
   */
  searchUnits: function(filters = {}, length = 1) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/unit`;
    let defaultData =  {
      q: '*',
      length: length
    };
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultData, filters);
    return Ember.$.ajax(url, options);
  },


  /**
   * Fetches rubrics that match with the node
   *
   * @param filters
   * @returns {Promise.<Course[]>}
   */
  searchLessons: function(filters = {}, length = 1) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/lesson`;
    let defaultData =  {
      q: '*',
      length: length
    };
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultData, filters);
    return Ember.$.ajax(url, options);
  },


  /**
   * Fetches learningMapsContent
   *
   * @param nodeData the term to search
   * @returns {Promise.<Course[]>}
   */
  learningMapsContent: function(nodeData) {
    const adapter = this;
    const namespace1 = this.get('namespace1');
    const url = `${namespace1}/standard/${nodeData.id}`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }
});
