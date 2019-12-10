import Ember from 'ember';
import TaxonomyRoot from 'admin-dataview/models/taxonomy/taxonomy-root';
import TaxonomyItem from 'admin-dataview/models/taxonomy/taxonomy-item';
import TaxonomyTagData from 'admin-dataview/models/taxonomy/taxonomy-tag-data';
import { TAXONOMY_LEVELS } from 'admin-dataview/config/config';

/**
 * Serializer for Taxonomy endpoints
 *
 * @typedef {Object} TaxonomySerializer
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  /**
   * Normalize the Fetch Taxonomy Subjects endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Subject[]} an array of subjects
   */
  normalizeFetchSubjects: function(payload) {
    let result = Ember.A();
    const serializer = this;
    const subjects = payload.subjects;
    if (Ember.isArray(subjects)) {
      subjects.forEach(subject => {
        result.pushObject(serializer.normalizeSubject(subject));
      });
    }
    return result;
  },

  /**
   * Method to normalize taxonomy subjects from DS
   */
  normalizeTaxonomySubjects(subjectPayload) {
    var result = [];
    const serializer = this;
    const subjects = subjectPayload.subjects;
    if (Ember.isArray(subjects)) {
      result = subjects.map(function(subject) {
        return serializer.normalizeSubject(subject);
      });
    }
    return result;
  },

  normalizeSubject: function(subjectPayload) {
    var serializer = this;
    return TaxonomyRoot.create(Ember.getOwner(serializer).ownerInjection(), {
      id: subjectPayload.id,
      frameworkId: subjectPayload.standard_framework_id,
      title: subjectPayload.title,
      subjectTitle: subjectPayload.title,
      code: subjectPayload.code,
      frameworks: serializer.normalizeFrameworks(
        subjectPayload.frameworks,
        subjectPayload.title
      )
    });
  },

  normalizeFrameworks: function(frameworksPayload, parentTitle) {
    var frameworks = [];
    const serializer = this;
    if (frameworksPayload && Ember.isArray(frameworksPayload)) {
      frameworks = frameworksPayload.map(function(framework) {
        return serializer.normalizeFramework(framework, parentTitle);
      });
    }
    return frameworks;
  },

  normalizeFramework: function(subjectPayload, parentTitle) {
    const serializer = this;
    return TaxonomyRoot.create(Ember.getOwner(serializer).ownerInjection(), {
      id: subjectPayload.taxonomy_subject_id,
      frameworkId: subjectPayload.standard_framework_id,
      title: subjectPayload.title,
      subjectTitle: `${parentTitle}`
    });
  },

  /**
   * Normalize the Fetch Taxonomy Courses endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]} an array of courses
   */
  normalizeFetchCourses: function(payload) {
    var result = Ember.A();
    const serializer = this;
    const courses = payload.courses;
    if (Ember.isArray(courses)) {
      courses.forEach(course => {
        result.pushObject(serializer.normalizeCourse(course));
      });
    }
    return result;
  },

  normalizeCourse: function(coursePayload) {
    var serializer = this;
    return TaxonomyItem.create(Ember.getOwner(serializer).ownerInjection(), {
      id: coursePayload.id,
      code: coursePayload.code,
      title: coursePayload.title
    });
  },

  /**
   * Normalize the Fetch Taxonomy Domains endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]} an array of domains
   */
  normalizeFetchDomains: function(payload) {
    var result = Ember.A();
    const serializer = this;
    const domains = payload.domains;
    if (Ember.isArray(domains)) {
      domains.forEach(domain => {
        result.pushObject(serializer.normalizeDomain(domain));
      });
    }
    return result;
  },

  normalizeDomain: function(domainPayload) {
    return TaxonomyItem.create({
      id: domainPayload.id,
      code: domainPayload.code,
      title: domainPayload.title
    });
  },

  /**
   * Normalize the Fetch Taxonomy Codes endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Object[]} an array of objects, each one with code information.
   */
  normalizeFetchCodes: function(payload) {
    var result = Ember.A();
    const serializer = this;
    const codes = payload.codes;
    if (Ember.isArray(codes)) {
      codes.forEach(code => {
        result.pushObject(serializer.normalizeCode(code));
      });
    }
    return result;
  },

  normalizeCode: function(codePayload) {
    return {
      id: codePayload.id,
      code: codePayload.code,
      title: codePayload.title,
      parentTaxonomyCodeId: codePayload.parent_taxonomy_code_id,
      codeType: codePayload.code_type
    };
  },

  /**
   * Serialize a TaxonomyTagData object into a JSON representation required by
   * a core element (course|unit|collection|assessment|resource|question)
   *
   * @param taxonomyData the taxonomyData object
   * @returns {Object} a JSON Object
   */
  serializeTaxonomy: function(taxonomyData) {
    var taxonomyResult = null;
    if (
      taxonomyData &&
      Ember.isArray(taxonomyData) &&
      taxonomyData.length > 0
    ) {
      taxonomyResult = {};
      taxonomyData.forEach(function(taxonomy) {
        const taxonomyKey = taxonomy.get('id');
        taxonomyResult[taxonomyKey] = {
          code: taxonomy.get('code'),
          title: taxonomy.get('title'),
          codeType: taxonomy.get('codeType'),
          parent_title: taxonomy.hasOwnProperty('parentTitle')
            ? taxonomy.get('parentTitle')
            : '',
          description: taxonomy.get('description'),
          framework_code: taxonomy.get('frameworkCode')
        };
      });
    }
    return taxonomyResult;
  },

  /**
   * Normalize the core element taxonomy data into a TaxonomyTagData object
   *
   * @param taxonomyArray - array of taxonomy objects
   * @param {string} level
   * @returns {TaxonomyTagData[]} a TaxonomyTagData array
   */
  normalizeTaxonomyArray: function(taxonomyArray, level) {
    var taxonomyData = [];

    if (taxonomyArray && taxonomyArray.length) {
      taxonomyArray.forEach(function(taxonomyObject) {
        let isMicroStandard = TaxonomyTagData.isMicroStandardId(
          taxonomyObject.internalCode
        );

        taxonomyData.push(
          TaxonomyTagData.create({
            id: taxonomyObject.internalCode,
            code: taxonomyObject.code,
            title: taxonomyObject.title,
            parentTitle: taxonomyObject.parentTitle,
            frameworkCode: taxonomyObject.frameworkCode,
            taxonomyLevel: level
              ? level
              : isMicroStandard
                ? TAXONOMY_LEVELS.MICRO
                : TAXONOMY_LEVELS.STANDARD
          })
        );
      });
    }
    return Ember.A(taxonomyData);
  },

  /**
   * Normalize the learning maps taxonomy array
   *
   * @param taxonomyArray - array of taxonomy objects
   * @param {string} level
   * @returns {TaxonomyTagData[]} a TaxonomyTagData array
   */
  normalizeLearningMapsTaxonomyArray: function(taxonomyObject, level) {
    var taxonomyData = [];
    if (taxonomyObject) {
      Object.keys(taxonomyObject).forEach(function(internalCode) {
        let isMicroStandard = TaxonomyTagData.isMicroStandardId(
          taxonomyObject.internalCode
        );
        let taxonomyInfo = taxonomyObject[internalCode];

        taxonomyData.push(
          TaxonomyTagData.create({
            id: internalCode,
            code: taxonomyInfo.code,
            title: taxonomyInfo.title,
            parentTitle: taxonomyInfo.parentTitle || taxonomyInfo.parent_title,
            frameworkCode:
              taxonomyInfo.frameworkCode || taxonomyInfo.framework_code,
            taxonomyLevel: level
              ? level
              : isMicroStandard
                ? TAXONOMY_LEVELS.MICRO
                : TAXONOMY_LEVELS.STANDARD
          })
        );
      });
    }
    return Ember.A(taxonomyData);
  },

  /**
   * Normalize the core element taxonomy data into a TaxonomyTagData object
   *
   * @param taxonomyObject - object of taxonomy objects
   * @param level taxonomy level
   * @returns {TaxonomyTagData[]} a TaxonomyTagData array
   */
  normalizeTaxonomyObject: function(taxonomyObject, level) {
    var taxonomyData = [];
    if (taxonomyObject) {
      for (var key in taxonomyObject) {
        if (taxonomyObject.hasOwnProperty(key)) {
          let taxonomy = taxonomyObject[key];
          let isMicroStandard = level
            ? false
            : TaxonomyTagData.isMicroStandardId(key);
          taxonomyData.push(
            TaxonomyTagData.create({
              id: key,
              code: taxonomy.code,
              title: taxonomy.title,
              parentTitle: taxonomy.parent_title ? taxonomy.parent_title : '',
              description: taxonomy.description ? taxonomy.description : '',
              frameworkCode: taxonomy.framework_code,
              taxonomyLevel: level
                ? level
                : isMicroStandard
                  ? TAXONOMY_LEVELS.MICRO
                  : TAXONOMY_LEVELS.STANDARD
            })
          );
        }
      }
    }
    return Ember.A(taxonomyData);
  },

  /**
   * Serialize a TaxonomyTagData object into a JSON representation only for Resource Player Events
   *
   * @param taxonomyData the taxonomyData object
   * @returns {Object} a JSON Object
   */
  serializeTaxonomyForEvents: function(taxonomyData) {
    var taxonomyResult = null;
    if (
      taxonomyData &&
      Ember.isArray(taxonomyData) &&
      taxonomyData.length > 0
    ) {
      taxonomyResult = {};
      taxonomyData.forEach(function(taxonomy) {
        const taxonomyKey = taxonomy.get('id');
        taxonomyResult[taxonomyKey] = taxonomy.get('code');
      });
    }
    return taxonomyResult;
  },

  /**
   * Normalize the Fetch Taxonomy classification endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Subject[]} an array of subjects
   */
  normalizeFetchClassification: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.subject_classifications);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalize the Fetch user profile grade list data
   *
   * @param payload is the endpoint response in JSON format
   * @returns {grade[]} an array of grades
   */
  normalizeUserProfileGrades(payload) {
    let userProfileGrades = Ember.A([]);
    if (payload.length) {
      payload.forEach(grade => {
        userProfileGrades.pushObject(Ember.Object.create(grade));
      });
    }
    return userProfileGrades;
  }
});
