import Ember from 'ember';
import SearchSerializer from 'admin-dataview/serializers/search/search';
import SearchAdapter from 'admin-dataview/adapters/search/search';

/**
 * Service to support the Search of Collections and Resources
 *
 * @typedef {Object} SearchService
 */
export default Ember.Service.extend({
  searchSerializer: null,

  searchAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'searchSerializer',
      SearchSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'searchAdapter',
      SearchAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Search collections
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Collection[]>}
   */
  searchCollections: function(query, filters, start, length) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchCollections(query, filters, start, length)
        .then(function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchCollection(response)
          );
        }, reject);
    });
  },

  /**
   * Search assessments
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Assessment[]>}
   */
  searchAssessments: function(query, filters, start, length) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchAssessments(query, filters, start, length)
        .then(function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchAssessments(response)
          );
        }, reject);
    });
  },

  /**
   * Search courses
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Resource[]>}
   */
  searchResources: function(query, filters, start, length, isOnlyHitCount = false) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchResources(query, filters, start, length)
        .then(
          function(response) {
            let result = isOnlyHitCount ? service.get('searchSerializer').normalizeSearchContentCount(response) : service.get('searchSerializer').nomalizeSearchResources(response);
            resolve(
              result
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Search for questions
   *
   * @param filters
   * @returns {Promise.<Question[]>}
   */
  searchQuestions: function(filters) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchQuestions(filters)
        .then(
          function(response) {
            resolve(
              service.get('searchSerializer').normalizeSearchContentCount(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Search courses
   * @param  {String} query
   * @param  {Object} filters
   * @param  {Number} start
   * @param  {Number} length
   * @return {Promise.<Course[]>}
   */
  searchCourses: function(query, filters, start, length) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchCourses(query, filters, start, length).then(
        function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchCourses(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },

  /**
   * Search for rubcris
   *
   * @param filters
   * @returns {Promise.<Question[]>}
   */
  searchRubrics: function(filters) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchRubrics(filters).then(
        function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchContentCount(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },


  /**
   * Search for units
   *
   * @param filters
   * @returns {Promise.<Question[]>}
   */
  searchUnits: function(filters) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchUnits(filters).then(
        function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchContentCount(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },


  /**
   * Search for units
   *
   * @param filters
   * @returns {Promise.<Question[]>}
   */
  searchLessons: function(filters) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchLessons(filters).then(
        function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchContentCount(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },

  getResourceContent: function(filters, length = 1) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchResources(filters, length).then(
        function(response) {
          resolve(
            service.get('searchSerializer').nomalizeSearchResourceContent(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },

  getCollectionContent: function(filters, length = 1) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchCollections(filters, length).then(
        function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchCollectionContent(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },

  getAssessmentContent: function(filters, length = 1) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchAssessments(filters, length).then(
        function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchAssessmentContent(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },

  getQuestionContent: function(filters, length) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchQuestions(filters, length).then(
        function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchQuestionContent(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  },


  learningMapsContent: function(filters, length) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').learningMapsContent(filters, length).then(
        function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchlearningMapsContent(response)
          );
        },
        function(error) {
          reject(error);
        }
      );
    });
  }


});
