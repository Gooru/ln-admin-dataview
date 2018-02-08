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
   * Search for collections
   *
   * @param filters
   * @returns {Promise}
   */
  searchCollections: function(filters) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchCollections(filters)
        .then(function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchContentCount(response)
          );
        }, reject);
    });
  },

  /**
   * Search for assessments
   *
   * @param filters
   * @returns {Promise}
   */
  searchAssessments: function(filters) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchAssessments(filters)
        .then(function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchContentCount(response)
          );
        }, reject);
    });
  },

  /**
   * Search for resources
   *
   * @param filters
   * @returns {Promise.<Resource[]>}
   */
  searchResources: function(filters, length) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchResources(filters, length)
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
   * Search for courses
   *
   * @param filters
   * @returns {Promise.<Question[]>}
   */
  searchCourses: function(filters) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchCourses(filters).then(
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

  getAssessmentContent: function(filters, length =1) {
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
