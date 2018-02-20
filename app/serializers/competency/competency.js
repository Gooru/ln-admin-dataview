import Ember from 'ember';

/**
 * Serializer for Competency endpoints
 *
 * @typedef {Object} CompetencySerializer
 */
export default Ember.Object.extend({

  /**
   * Normalized data of user competencies
   * @return {Object}
   */
  normalizeUserCompetencies: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.competencyList);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized data of user performance competency collections
   * @return {Object}
   */
  normalizeUserPerformanceCompetencyCollections: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.collections);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized data of  competency matrix coordinates
   * @return {Object}
   */
  normalizeCompetencyMatrixCoordinates: function(response) {
    let resultSet = Ember.Object.create(response);
    Object.keys(response).forEach(key => {
      let result = Ember.A();
      resultSet.get(key).forEach(data => {
        result.pushObject(Ember.Object.create(data));
      });
      resultSet.set(key, result);
    });
    return resultSet;
  },

  /**
   * Normalized data of user competency matrix
   * @return {Object}
   */
  normalizeCompetencyMatrix: function(response) {
    let resultSet = Ember.A();
    if (response.userCompetencyMatrix) {
      let userCompetencyMatrix = Ember.A(response.userCompetencyMatrix);
      userCompetencyMatrix.forEach(courseData => {
        let course = Ember.Object.create(courseData);
        let domains = course.get('domains');
        let domainSet = Ember.A();
        domains.forEach(data => {
          let competencySet = Ember.A();
          let domain = Ember.Object.create(data);
          let competencies = domain.get('competencies');
          competencies.forEach(competency => {
            competencySet.pushObject(Ember.Object.create(competency));
          });
          domain.set('competencies', competencySet);
          domainSet.pushObject(domain);
        });
        course.set('domains', domainSet);
        resultSet.pushObject(course);
      });
    }
    return resultSet;
  },

  /**
   * Normalized data of user competency matrix
   * @return {Object}
   */
  normalizeCompetencyMatrixDomain: function(response) {
    let resultSet = Ember.A();
    if (response.userCompetencyMatrix) {
      let userCompetencyMatrix = Ember.A(response.userCompetencyMatrix);
      userCompetencyMatrix.forEach(damainData => {
        let domain = Ember.Object.create(damainData);
        let competencies = domain.get('competencies');
        let domainSet = Ember.A();
        let competencySet = Ember.A();
        competencies.forEach(data => {
          competencySet.pushObject(Ember.Object.create(data));
        });
        domain.set('competencies', competencySet);
        domainSet.pushObject(domain);
        domain.set('domains', domainSet);
        resultSet.pushObject(domain);
      });
    }
    return resultSet;

  }

});
