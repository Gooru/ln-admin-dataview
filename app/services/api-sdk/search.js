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
   * @param nodeData
   * @returns {Promise}
   */
  searchCollections: function(nodeData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchCollections(nodeData)
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
   * @param nodeData
   * @returns {Promise}
   */
  searchAssessments: function(nodeData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchAssessments(nodeData)
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
   * @param nodeData
   * @returns {Promise.<Resource[]>}
   */
  searchResources: function(nodeData, lenght, resourceFormat) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchResources(nodeData, length, resourceFormat)
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
   * @param nodeData
   * @returns {Promise.<Question[]>}
   */
  searchQuestions: function(nodeData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchQuestions(nodeData)
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
   * @param nodeData
   * @returns {Promise.<Question[]>}
   */
  searchCourses: function(nodeData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchCourses(nodeData).then(
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
   * @param nodeData
   * @returns {Promise.<Question[]>}
   */
  searchRubrics: function(nodeData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchRubrics(nodeData).then(
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
   * @param nodeData
   * @returns {Promise.<Question[]>}
   */
  searchUnits: function(nodeData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchUnits(nodeData).then(
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
   * @param nodeData
   * @returns {Promise.<Question[]>}
   */
  searchLessons: function(nodeData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchLessons(nodeData).then(
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

  getResourceContent: function(nodeData, length = 1) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchResources(nodeData, length).then(
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

  getCollectionContent: function(nodeData, length = 1) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchCollections(nodeData, length).then(
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

  getAssessmentContent: function(nodeData, length =1) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchAssessments(nodeData, length).then(
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

  getQuestionContent: function(nodeData, length) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchQuestions(nodeData, length).then(
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


  learningMapsContent: function(nodeData, length) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').learningMapsContent(nodeData, length).then(
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
