import Ember from 'ember';
import {
  LEARNING_MAP_CONTENT_SEQUENCE,
  LEARNING_MAP_DEFAULT_LEVELS
} from 'admin-dataview/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['learning-map', 'competency-table'],

  /**
   * @requires searchService
   */
  searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.setupScrollable();
  },

  didRender() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    const $competencyTable = component.$('.table-structure');
    let width =
      $competencyTable.get(0).scrollHeight > $competencyTable.height()
        ? '190px'
        : '205px';
    component.$('td.prerequisites-info').css('width', width);
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when the user click up arrow
     */
    onScrollTop() {
      let component = this;
      component.activateFirstItemByDefault();
      Ember.$('.browser-container').show();
      Ember.$('.learning-map-container').animate(
        {
          scrollTop: 0
        },
        'slow'
      );
      component.resetPrerequisitesInfo();
      component.sendAction('onToggleExportButton', false);
    },

    /**
     * Action triggered when the user toggle micro-competency visibility
     */
    onToggleButton() {
      let component = this;
      component.toggleProperty('isShowMicroCompetency');
      component.$('.micro-competency').toggleClass('hide-row');
    },

    /**
     * Action triggered when the user select prerequisites
     */
    onSelectPrerequisites(prerequisitesId) {
      let component = this;
      component.fetchLearningMapContent(prerequisitesId);
    },

    /**
     * Action triggered when the user close prerequisites popup
     */
    onCloseInfoPopup() {
      let component = this;
      component.resetPrerequisitesInfo();
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function setupScrollable
   * Method to setup scroll event
   */
  setupScrollable() {
    let component = this;
    const $competencyTable = component.$('.table-structure');
    $competencyTable.scroll(function() {
      let isEnd =
        $competencyTable.scrollTop() + $competencyTable.innerHeight() >=
        $competencyTable[0].scrollHeight;
      if (isEnd) {
        component.sendAction('onScrollBottom');
      }
    });
  },

  /**
   * @function fetchLearningMapContent
   * Method to fetch learning map content
   */
  fetchLearningMapContent(competencyId) {
    let component = this;
    component.set('isLoading', true);
    let length = 1;
    let filters = {
      id: competencyId,
      fwCode: component.get('defaultFramework')
    };
    let learningMapPromise = Ember.RSVP.resolve(
      component.get('searchService').learningMapsContent(filters, length)
    );
    return Ember.RSVP.hash({
      competencyContent: learningMapPromise
    }).then(function(hash) {
      component.set(
        'prerequisitesCompetencyInfo',
        component.normalizeLearningMapContent(hash.competencyContent)
      );
      component.set('isShowCompetencyInfo', true);
      component.set('isLoading', false);
      Ember.$('.learning-map-container').addClass('non-scrollable-margin');
      Ember.$('.table-structure').addClass('non-scrollable-margin');
    });
  },

  /**
   * @function normalizeLearningMapContent
   * Method to normalize learning map content response
   */
  normalizeLearningMapContent(competencyContent) {
    let component = this;
    let competencyContents = competencyContent.contents;
    let signatureContents = competencyContent.signatureContents;
    let normalizedContent = {
      id: competencyContent.gutCode,
      title: competencyContent.title,
      contentCounts: [
        component.getStruncturedCompetencyInfo(
          'course',
          competencyContents.course.totalHitCount
        ),
        component.getStruncturedCompetencyInfo(
          'unit',
          competencyContents.unit.totalHitCount
        ),
        component.getStruncturedCompetencyInfo(
          'lesson',
          competencyContents.lesson.totalHitCount
        ),
        component.getStruncturedCompetencyInfo(
          'collection',
          competencyContents.collection.totalHitCount
        ),
        component.getStruncturedCompetencyInfo(
          'assessment',
          competencyContents.assessment.totalHitCount
        ),
        component.getStruncturedCompetencyInfo(
          'resource',
          competencyContents.resource.totalHitCount
        ),
        component.getStruncturedCompetencyInfo(
          'question',
          competencyContents.question.totalHitCount
        ),
        component.getStruncturedCompetencyInfo(
          'rubric',
          competencyContents.rubric.totalHitCount
        ),
        component.getStruncturedCompetencyInfo(
          'signatureCollection',
          signatureContents.collections.length
        ),
        component.getStruncturedCompetencyInfo(
          'signatureAssessment',
          signatureContents.assessments.length
        )
      ],
      prerequisites: competencyContent.prerequisites
    };
    return normalizedContent;
  },

  /**
   * @function getStruncturedCompetencyInfo
   * Method to get structured competency info
   */
  getStruncturedCompetencyInfo(type, value) {
    return {
      type: type,
      value: value
    };
  },

  /**
   * @function activateFirstItemByDefault
   * Method to set first item in each component selected by default
   */
  activateFirstItemByDefault() {
    let defaultLevels = LEARNING_MAP_DEFAULT_LEVELS;
    const $categoryComponent = Ember.$('.category .item');
    const $subjectComponent = Ember.$('.subject .item');
    const $courseComponent = Ember.$('.course .item');
    if (!$categoryComponent.hasClass('active')) {
      Ember.$(`.category .item.${defaultLevels.categoryCode}`).addClass(
        'active'
      );
    }
    if (!$subjectComponent.hasClass('active')) {
      Ember.$(
        `.subject .item.${defaultLevels.subjectCode.replace(/\./, '-')}`
      ).addClass('active');
    }
    if (!$courseComponent.hasClass('active')) {
      Ember.$(
        `.course .item.${defaultLevels.courseCode.replace(/\./, '-')}`
      ).addClass('active');
    }
  },

  /**
   * @function resetPrerequisitesInfo
   * Method to reset prerequisites info items
   */
  resetPrerequisitesInfo() {
    let component = this;
    if (component.get('isShowCompetencyInfo')) {
      component.set('isShowCompetencyInfo', false);
      component.set('prerequisitesCompetencyInfo', {});
      Ember.$('.learning-map-container').toggleClass('non-scrollable-margin');
      Ember.$('.table-structure').toggleClass('non-scrollable-margin');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array}
   * Propety to store sequence of content items
   */
  contentSequence: LEARNING_MAP_CONTENT_SEQUENCE,

  /**
   * @property {Boolean}
   * Propety to show/hide micro-competency
   */
  isShowMicroCompetency: false,

  /**
   * @property {Boolean}
   * Property to show/hide prerequisites competency info
   */
  isShowCompetencyInfo: false,

  /**
   * @property {Objet}
   * Property to store fetched prerequisites info
   */
  prerequisitesCompetencyInfo: null
});