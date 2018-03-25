import Ember from 'ember';
import { LEARNING_MAP_CONTENT_SEQUENCE } from 'admin-dataview/config/config';

export default Ember.Component.extend({
  classNames: ['learning-map', 'competency-table'],

  searchService: Ember.inject.service('api-sdk/search'),

  start: 0,

  length: 50,

  competencies: null,

  contentSequence: LEARNING_MAP_CONTENT_SEQUENCE,

  tableBody: [],

  didInsertElement() {
    let component = this;
    component.fetchLearningMapCompetency();
  },

  obseveCompetency: Ember.observer('competencies', function() {
    let component = this;
    let competencies = component.get('competencies');
    let tableBody = [];
    competencies.competencyInfo.map(competency => {
      let tableRow = {
        id: competency.id,
        title: competency.title,
        contentCounts: component.getStructuredContentCount(
          competency.contentCounts
        ),
        prerequisites: competency.prerequisites
      };
      tableBody.push(tableRow);
    });
    component.set('tableBody', tableBody);
  }),

  fetchLearningMapCompetency() {
    let component = this;
    let dataLevels = component.get('dataLevels');
    let start = component.get('start');
    let length = component.get('length');
    let filters = Object.assign(dataLevels);
    let competencyPromise = Ember.RSVP.resolve(
      component
        .get('searchService')
        .fetchLearningMapCompetency(filters, start, length)
    );
    return Ember.RSVP.hash({
      competencyList: competencyPromise
    }).then(function(hash) {
      component.set('competencies', hash.competencyList);
    });
  },

  getStructuredContentCount(contentCounts) {
    let component = this;
    let contentSequence = component.get('contentSequence');
    let structuredContentCount = [];
    contentSequence.map(sequence => {
      let contentCount = {
        type: sequence,
        count: contentCounts[`${sequence}`]
      };
      structuredContentCount.push(contentCount);
    });
    return structuredContentCount;
  }
});
