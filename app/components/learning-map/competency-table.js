import Ember from 'ember';
import { LEARNING_MAP_CONTENT_SEQUENCE } from 'admin-dataview/config/config';

export default Ember.Component.extend({
  classNames: ['learning-map', 'competency-table'],

  contentSequence: LEARNING_MAP_CONTENT_SEQUENCE,

  isShowMicroCompetency: false,

  isShowCompetencyInfo: false,

  prerequisitesCompetencyInfo: null,

  searchService: Ember.inject.service('api-sdk/search'),

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

  actions: {
    /**
     * Action triggered when the user click up arrow
     */
    onScrollTop() {
      Ember.$('.browser-container').show();
      Ember.$('.learning-map-container').animate(
        {
          scrollTop: 0
        },
        'slow'
      );
    },

    onToggleButton() {
      let component = this;
      component.toggleProperty('isShowMicroCompetency');
      component.$('.micro-competency').toggleClass('hide-row');
    },

    onSelectPrerequisites(prerequisitesId) {
      let component = this;
      component.fetchLearningMapContent(prerequisitesId);
    }
  },

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

  fetchLearningMapContent(competencyId) {
    let component = this;
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
      // component.set('isShowCompetencyInfo', true);
    });
  },

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

  getStruncturedCompetencyInfo(type, value) {
    return {
      type: type,
      value: value
    };
  }
});
