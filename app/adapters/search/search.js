import Ember from 'ember';
import { GOOGLE_API_KEY, SEARCH_API } from 'admin-dataview/config/config';

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
  searchCollections(query = '*', filters = {}, start = 0, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let defaultData = {
      q: query,
      length: length,
      startAt: start,
      'flt.collectionType': 'collection',
      isCrosswalk: false
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
  searchAssessments(query = '*', filters = {}, start = 0, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    let defaultData = {
      q: query,
      length: length,
      startAt: start,
      'flt.collectionType': 'assessment',
      isCrosswalk: false
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
  searchResources(query = '*', filters = {}, start = 0, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let defaultData = {
      q: query,
      length: length,
      startAt: start,
      'flt.contentFormat': 'resource',
      isCrosswalk: false
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
  searchQuestions(query = '*', filters = {}, start = 0, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let defaultData = {
      q: query,
      length: length,
      startAt: start,
      'flt.resourceFormat': 'question',
      isCrosswalk: false
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
  searchCourses(query = '*', filters = {}, start = 0, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/course`;
    let defaultData = {
      q: query,
      startAt: start,
      length: length,
      isCrosswalk: false
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
  searchRubrics(query = '*', filters = {}, start = 0, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/rubric`;
    let defaultData = {
      q: query,
      length: length,
      startAt: start,
      isCrosswalk: false
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
  searchUnits: function(query = '*', filters = {}, start = 0, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/unit`;
    let defaultData = {
      q: query,
      length: length,
      startAt: start,
      isCrosswalk: false
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
  searchLessons(query = '*', filters = {}, start = 0, length = 20) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/lesson`;
    let defaultData = {
      q: query,
      length: length,
      startAt: start,
      isCrosswalk: false
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
  learningMapsContent(nodeData, length = 10, start = 0) {
    const adapter = this;
    const namespace1 = this.get('namespace1');
    const url = `${namespace1}/standard/${nodeData.id}`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = {
      startAt: start,
      length: length,
      isCrosswalk: false
    };
    if (nodeData.fwCode) {
      options.data.fwCode = nodeData.fwCode;
      options.data.isDisplayCode = false;
    }
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches learningMapsCompetencyContent
   *
   * @param nodeData the term to search
   * @returns {Promise.<Content[]>}
   */
  learningMapsCompetencyContent(nodeData, length = 10, start = 0) {
    const adapter = this;
    const namespace1 = this.get('namespace1');
    const url = `${namespace1}/competency/${nodeData.id}`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = {
      startAt: start,
      length: length,
      isCrosswalk: false
    };
    if (nodeData.fwCode) {
      options.data.fwCode = nodeData.fwCode;
      options.data.isDisplayCode = false;
    }
    return Ember.$.ajax(url, options);
  },

  fetchLearningMapCompetency(filters, start = 0, length = 0) {
    const adapter = this;
    const namespace1 = adapter.get('namespace1');
    const requestURL = `${namespace1}/stats`;
    let defaultFilters = {
      startAt: start,
      length: length,
      isCrosswalk: false
    };
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultFilters, filters);
    return Ember.$.ajax(requestURL, options);
  },

  /**
   * @function searchLearningMapComptency
   * Method to search learning map competency based on the search term
   */
  searchLearningMapCompetency(q = '*', start = 0, length = 500) {
    let adapter = this;
    const namespace1 = adapter.get('namespace1');
    const requestURL = `${namespace1}/stats/search`;
    let defaultFilters = {
      q: q,
      startAt: start,
      length: length,
      isCrosswalk: false
    };
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders()
    };
    options.data = Object.assign(defaultFilters);
    return Ember.$.ajax(requestURL, options);
  },

  /**
   * @function googleSearch
   * Method to search google content
   */
  googleSearch(query, start = 1) {
    let key = GOOGLE_API_KEY[Math.floor(Math.random() * GOOGLE_API_KEY.length)];
    let url = `${SEARCH_API.baseUrl}?key=${key}&cx=${SEARCH_API.googleCx}&q=${query}&start=${start}`;
    return Ember.$.ajax(url);
  },

  /**
   * @function bingSearch
   * Method to search bing content
   */
  bingSearch(query, start = 1) {
    let key = GOOGLE_API_KEY[Math.floor(Math.random() * GOOGLE_API_KEY.length)];
    let url = `${SEARCH_API.baseUrl}?key=${key}&cx=${SEARCH_API.bingCx}&q=${query}&start=${start}`;
    return Ember.$.ajax(url);
  },

  /**
   * @function comparativeSearch
   * Method
   */
  comparativeSearch(params) {
    const adapter = this;
    const namespace = this.get('namespace1');
    const url = `${namespace}`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: params
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders() {
    return {
      Authorization: `Token ${this.get('session.accessToken')}`
    };
  }
});
