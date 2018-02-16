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
   * Search collections
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Collection[]>}
   */
  searchCollections: function(query = '*', filters = {}, start = 1, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let defaultData = {
      q: query,
      length: length,
      start: start,
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
   * Search assessments
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Assessment[]>}
   */
  searchAssessments: function(query = '*', filters = {}, start = 1, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let defaultData = {
      q: query,
      length: length,
      start:start,
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
   * Search resource
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Resource[]>}
   */
  searchResources: function(query = '*', filters = {}, start = 1, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let defaultData = {
      q: query,
      length: length,
      start: start,
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
   * Search question
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Question[]>}
   */
  searchQuestions: function( query = '*',  filters = {}, start = 1, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let defaultData = {
      q: query,
      length: length,
      start: start,
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
   * Search courses
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Course[]>}
   */
  searchCourses: function(query = '*', filters = {}, start = 1, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/course`;
    let defaultData = {
      q: query,
      start: start,
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
   * Search rubrics
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Rubric[]>}
   */
  searchRubrics: function(query = '*', filters = {}, start = 1, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/rubric`;
    let defaultData = {
      q: query,
      length: length,
      start: start
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
   * Search units
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Unit[]>}
   */
  searchUnits: function(query = '*', filters = {}, start = 1, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/unit`;
    let defaultData = {
      q: query,
      length: length,
      start: start
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
   * Search lessons
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Lesson[]>}
   */
  searchLessons: function(query = '*', filters = {}, start = 1, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/lesson`;
    let defaultData = {
      q: query,
      length: length,
      start: start
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
   * @returns {Promise.<Content[]>}
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
