import Ember from 'ember';
import ConfigurationMixin from 'admin-dataview/mixins/configuration';
import ResourceModel from 'admin-dataview/models/resource/resource';
import QuestionModel from 'admin-dataview/models/question/question';
import CollectionModel from 'admin-dataview/models/collection/collection';
import AssessmentModel from 'admin-dataview/models/assessment/assessment';
import CourseModel from 'admin-dataview/models/course/course';
import TaxonomySerializer from 'admin-dataview/serializers/taxonomy/taxonomy';
import {
  DEFAULT_IMAGES,
  TAXONOMY_LEVELS
} from 'admin-dataview/config/config';
import ProfileModel from 'admin-dataview/models/profile/profile';
import {
  getResourceFormat
} from 'admin-dataview/utils/utils';

/**
 * Serializer to support Search functionality
 *
 * @typedef {Object} SearchSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  /**
   * @property {TaxonomySerializer} taxonomySerializer
   */
  taxonomySerializer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'taxonomySerializer',
      TaxonomySerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },


  /**
   * Normalize the Search course response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]}
   */
  normalizeSearchCourses: function(payload) {
    const serializer = this;
    let resultSet = Ember.Object.create({
      searchResults: Ember.A(),
      hitCount: payload.totalHitCount
    });
    if (Ember.isArray(payload.searchResults)) {
      let results = payload.searchResults.map(function(result) {
        return serializer.normalizeCourse(result);
      });
      resultSet.set('searchResults', results);
    }
    return resultSet;
  },

  /**
   * Normalizes a course
   * @param {*} result
   * @returns {Course}
   */
  normalizeCourse: function(result) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl = result.thumbnail ?
      basePath + result.thumbnail :
      appRootPath + DEFAULT_IMAGES.COURSE;
    const taxonomyInfo =
      (result.taxonomy &&
        result.taxonomy.curriculum &&
        result.taxonomy.curriculum.curriculumInfo) || [];
    return CourseModel.create(Ember.getOwner(this).ownerInjection(), {
      id: result.id,
      title: result.title,
      description: result.description,
      thumbnailUrl: thumbnailUrl,
      subject: result.subjectBucket,
      subjectName: result.taxonomy && result.taxonomy.subject ?
        result.taxonomy.subject[0] : null,
      subjectSequence: result.subjectSequence,
      isVisibleOnProfile: result.visibleOnProfile,
      isPublished: result.publishStatus === 'published',
      unitCount: result.unitCount,
      taxonomy: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo, TAXONOMY_LEVELS.COURSE),
      owner: result.owner ? serializer.normalizeOwner(result.owner) : null,
      sequence: result.sequence,
      relevance: result.relevance,
      efficacy: result.efficacy,
      engagement: result.engagement
    });
  },

  nomalizeSearchResources: function(payload) {
    const serializer = this;
    let resultSet = Ember.Object.create({
      searchResults: Ember.A(),
      hitCount: payload.totalHitCount
    });
    if (Ember.isArray(payload.searchResults)) {
      let results = payload.searchResults.map(function(result) {
        return serializer.normalizeResource(result);
      });
      resultSet.set('searchResults', results);
    }
    return resultSet;
  },

  normalizeResource: function(resource) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const format = getResourceFormat(resource.contentSubFormat);
    const taxonomyInfo =
      (resource.taxonomySet &&
        resource.taxonomySet.curriculum &&
        resource.taxonomySet.curriculum.curriculumInfo) || [];
    return ResourceModel.create(Ember.getOwner(this).ownerInjection(), {
      id: resource.gooruOid,
      title: resource.title,
      description: resource.description,
      format: format,
      url: resource.url,
      thumbnailUrl: resource.thumbnail ?
        basePath + resource.thumbnail : DEFAULT_IMAGES.RESOURCE,
      creator: resource.creator ? serializer.normalizeOwner(resource.creator) : null,
      owner: resource.user ? serializer.normalizeOwner(resource.user) : null,
      type: 'resource',
      standards: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo),
      publishStatus: resource.publishStatus,
      publisher: resource.publisher ? resource.publisher[0] : null,
      efficacy: resource.efficacy ? resource.efficacy : null,
      relevance: resource.relevance ? resource.relevance : null,
      engagement: resource.engagement ? resource.engagement : null
    });
  },

  /**
   * Normalize the Search collections response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Collection[]}
   */
  normalizeSearchCollection: function(payload) {
    const serializer = this;
    let resultSet = Ember.Object.create({
      searchResults: Ember.A(),
      hitCount: payload.totalHitCount
    });
    if (Ember.isArray(payload.searchResults)) {
      let results = payload.searchResults.map(function(result) {
        return serializer.normalizeCollection(result);
      });
      resultSet.set('searchResults', results);
    }
    return resultSet;
  },

  /**
   * Normalize a collection
   * @param {*} collectionData
   * @returns {Collection}
   */
  normalizeCollection: function(collectionData) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const userBasePath = serializer.get('session.cdnUrls.user');

    const thumbnailUrl = collectionData.thumbnail ?
      basePath + collectionData.thumbnail :
      DEFAULT_IMAGES.COLLECTION;
    const userThumbnailUrl = collectionData.userProfileImage ?
      userBasePath + collectionData.userProfileImage :
      DEFAULT_IMAGES.USER_PROFILE;
    const creatorThumbnailUrl = collectionData.creatorProfileImage ?
      userBasePath + collectionData.creatorProfileImage :
      DEFAULT_IMAGES.USER_PROFILE;
    const taxonomyInfo =
      (collectionData.taxonomySet &&
        collectionData.taxonomySet.curriculum &&
        collectionData.taxonomySet.curriculum.curriculumInfo) || [];

    const course = collectionData.course || {};
    return CollectionModel.create(Ember.getOwner(this).ownerInjection(), {
      id: collectionData.id,
      title: collectionData.title,
      description: collectionData.description,
      type: collectionData.type,
      thumbnailUrl: thumbnailUrl,
      standards: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo),
      publishStatus: collectionData.publishStatus,
      learningObjectives: collectionData.languageObjective,
      resourceCount: collectionData.resourceCount || 0,
      questionCount: collectionData.questionCount || 0,
      remixCount: collectionData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: collectionData.profileUserVisibility,
      owner: ProfileModel.create({
        id: collectionData.gooruUId,
        firstName: collectionData.userFirstName,
        lastName: collectionData.userLastName,
        avatarUrl: userThumbnailUrl,
        username: collectionData.usernameDisplay
      }),
      creator: ProfileModel.create({
        id: collectionData.creatorId,
        firstName: collectionData.creatorFirstname,
        lastName: collectionData.creatorLastname,
        avatarUrl: creatorThumbnailUrl,
        username: collectionData.creatornameDisplay
      }),
      taxonomySet: collectionData.taxonomySet,
      createdData: collectionData.addDate,
      efficacy: collectionData.efficacy ? collectionData.efficacy : null,
      relevance: collectionData.relevance ? collectionData.relevance : null,
      engagement: collectionData.engagement ? collectionData.engagement : null
    });
  },

  /**
   * Normalize the Search assessments response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Assessment[]}
   */
  normalizeSearchAssessments: function(payload) {
    const serializer = this;
    let resultSet = Ember.Object.create({
      searchResults: Ember.A(),
      hitCount: payload.totalHitCount
    });
    if (Ember.isArray(payload.searchResults)) {
      let results = payload.searchResults.map(function(result) {
        return serializer.normalizeAssessment(result);
      });
      resultSet.set('searchResults', results);
    }
    return resultSet;
  },

  /**
   * Normalize an assessment
   * @param {*} assessmentData
   * @returns {Assessment}
   */
  normalizeAssessment: function(assessmentData) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const userBasePath = serializer.get('session.cdnUrls.user');
    const thumbnailUrl = assessmentData.thumbnail ?
      basePath + assessmentData.thumbnail :
      DEFAULT_IMAGES.ASSESSMENT;
    const ownerThumbnailUrl = assessmentData.userProfileImage ?
      userBasePath + assessmentData.userProfileImage :
      DEFAULT_IMAGES.USER_PROFILE;
    const creatorThumbnailUrl = assessmentData.creatorProfileImage ?
      userBasePath + assessmentData.creatorProfileImage :
      DEFAULT_IMAGES.USER_PROFILE;
    const taxonomyInfo =
      (assessmentData.taxonomySet &&
        assessmentData.taxonomySet.curriculum &&
        assessmentData.taxonomySet.curriculum.curriculumInfo) || [];
    const course = assessmentData.course || {};
    return AssessmentModel.create(Ember.getOwner(this).ownerInjection(), {
      id: assessmentData.id,
      title: assessmentData.title,
      description: assessmentData.description,
      type: assessmentData.type,
      thumbnailUrl: thumbnailUrl,
      standards: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo),
      publishStatus: assessmentData.publishStatus,
      learningObjectives: assessmentData.languageObjective,
      resourceCount: assessmentData.resourceCount ?
        Number(assessmentData.resourceCount) : 0,
      questionCount: assessmentData.questionCount ?
        Number(assessmentData.questionCount) : 0,
      remixCount: assessmentData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: assessmentData.profileUserVisibility,
      owner: ProfileModel.create({
        id: assessmentData.gooruUId,
        firstName: assessmentData.userFirstName,
        lastName: assessmentData.userLastName,
        avatarUrl: ownerThumbnailUrl,
        username: assessmentData.usernameDisplay
      }),
      creator: ProfileModel.create({
        id: assessmentData.creatorId,
        firstName: assessmentData.creatorFirstname,
        lastName: assessmentData.creatorLastname,
        avatarUrl: creatorThumbnailUrl,
        username: assessmentData.creatornameDisplay
      }),
      efficacy: assessmentData.efficacy ? assessmentData.efficacy : null,
      relevance: assessmentData.relevance ? assessmentData.relevance : null,
      engagement: assessmentData.engagement ? assessmentData.engagement : null
    });
  },

  normalizeSearchQuestions: function(payload) {
    const serializer = this;
    let resultSet = Ember.Object.create({
      searchResults: Ember.A(),
      hitCount: payload.totalHitCount
    });
    if (Ember.isArray(payload.searchResults)) {
      let results = payload.searchResults.map(function(result) {
        return serializer.normalizeQuestion(result);
      });
      resultSet.set('searchResults', results);
    }
    return resultSet;
  },

  /**
   * Normalizes a question
   * @param {*} result
   * @returns {Question}
   */
  normalizeQuestion: function(questionData) {
    const serializer = this;
    const taxonomyInfo =
      (questionData.taxonomySet &&
        questionData.taxonomySet.curriculum &&
        questionData.taxonomySet.curriculum.curriculumInfo) || [];
    const format = QuestionModel.normalizeQuestionType(questionData.contentSubFormat);
    return QuestionModel.create(Ember.getOwner(this).ownerInjection(), {
      id: questionData.gooruOid,
      title: questionData.title,
      description: questionData.description,
      type: questionData.resourceFormat.value,
      format: format,
      publisher: null, //TODO missing publisher at API response,
      thumbnailUrl: questionData.thumbnail,
      creator: questionData.creator ? serializer.normalizeOwner(questionData.creator) : null,
      owner: questionData.user ? serializer.normalizeOwner(questionData.user) : null,
      standards: serializer.get('taxonomySerializer').normalizeTaxonomyArray(taxonomyInfo),
      efficacy: questionData.efficacy ? questionData.efficacy : null,
      relevance: questionData.relevance ? questionData.relevance : null,
      engagement: questionData.engagement ? questionData.engagement : null,
      contentSubFormat: questionData.contentSubFormat
    });
  },


  /**
   * Normalizes a question
   * @param {*} result
   * @returns {Question}
   */
  normalizeSearchlearningMapsContent: function(learningMapsContent) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    // const userBasePath = serializer.get('session.cdnUrls.user');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const signatureData = learningMapsContent.signatureContents;
    if (signatureData && signatureData.assessments) {
      signatureData.assessments.forEach(function(item) {
        item.thumbnail = item.thumbnail ?
          basePath + item.thumbnail :
          appRootPath + DEFAULT_IMAGES.ASSESSMENT;
      });
    }
    if (signatureData && signatureData.collections) {
      signatureData.collections.forEach(function(item) {
        item.thumbnail = item.thumbnail ?
          basePath + item.thumbnail :
          appRootPath + DEFAULT_IMAGES.COLLECTION;
      });
    }
    const returnObjects = {
      owner: Ember.getOwner(this).ownerInjection(),
      title: learningMapsContent.title,
      code: learningMapsContent.code,
      gutCode: learningMapsContent.gutCode,
      contents: learningMapsContent.contents,
      prerequisites: learningMapsContent.prerequisites,
      signatureContents: signatureData
    };
    return returnObjects;
  },


  /**
   * Normalizes owner
   * @param ownerData
   * @returns {Profile}
   */
  normalizeOwner: function(ownerData) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.user');
    const thumbnailUrl = ownerData.profileImage ?
      basePath + ownerData.profileImage : DEFAULT_IMAGES.USER_PROFILE;

    return ProfileModel.create(Ember.getOwner(this).ownerInjection(), {
      id: ownerData.gooruUId || ownerData.id,
      firstName: ownerData.firstName,
      lastName: ownerData.lastName,
      username: ownerData.usernameDisplay,
      avatarUrl: thumbnailUrl
    });
  },

  /**
   * Normalize the Search response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {contentCount}
   */
  normalizeSearchContentCount: function(payload) {

    let totalHitCount = payload ? payload.totalHitCount : null;
    return totalHitCount;
  }

});
