import Ember from 'ember';
import { LEARNING_MAP_DEFAULT_LEVELS } from 'admin-dataview/config/config';

export default Ember.Controller.extend({
  searchService: Ember.inject.service('api-sdk/search'),

  enableGenerateTableBtn: true,

  dataLevels: LEARNING_MAP_DEFAULT_LEVELS,

  domainStack: [],

  actions: {
    onExportCompetency() {
      return true;
    },

    onSelectDataItem(type, dataItem) {
      let controller = this;
      controller.updateDataLevel(type, dataItem);
    },

    onSelectDomain(domainStack) {
      let controller = this;
      controller.set('domainStack', domainStack);
    }
  },

  updateDataLevel(type, dataItem) {
    let controller = this;
    let dataLevels = controller.get('dataLevels');
    switch (type) {
    case 'category':
      dataLevels.subjectClassification = dataItem.value;
      dataLevels.subjectCode = '';
      dataLevels.courseCode = '';
      break;
    case 'subject':
      dataLevels.subjectCode = dataItem.id;
      dataLevels.courseCode = '';
      break;
    case 'course':
      dataLevels.courseCode = dataItem.id;
      break;
    }
    controller.set('dataLevels', dataLevels);
  }
});
