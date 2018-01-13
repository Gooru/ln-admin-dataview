import Ember from 'ember';
import {truncateString} from 'admin-dataview/utils/utils';

export default Ember.Controller.extend({

  //------------------------------------------------------------------------
  //Dependencies

  /**
   * @requires service:crosswalk
   */
  crosswalkService: Ember.inject.service('api-sdk/crosswalk'),

  //------------------------------------------------------------------------
  //Properties

  /**
  * Property to handle enable/disable generate table button
  */
  enableGenerateTableBtn: false,

  /**
  * Property to handle show/hide crosswalk table
  */
  showCrosswalkTable: false,

  /**
  * Property to store list of selected frameworks
  */
  selectedFrameworks: [],

  /**
  * Property to store current subjectId
  */
  subjectId: null,

  /**
  * Property to store complete table data
  */
  tableData: [],

  /**
  * Default crosswalk table header items
  */
  defaultTableHeaderItems: ['COMPETENCY', 'GUT CODE'],

  //------------------------------------------------------------------------
  // Actions

  actions: {

    /**
    * Action triggered when user select framework
    */
    frameworkStack: function(subjectId, frameworkId) {
      let controller = this;
      let frameworkStack = controller.get('selectedFrameworks');
      let frameworkPosition = frameworkStack.indexOf(frameworkId);
      if (frameworkStack.includes(frameworkId)) {
        frameworkStack.splice(frameworkPosition, 1);
      } else {
        frameworkStack.push(frameworkId);
      }
      controller.set('selectedFrameworks', frameworkStack);
      controller.set('subjectId', subjectId);
      controller.set('enableGenerateTableBtn', true);
      let numberOfItems = frameworkStack.length;
      if (numberOfItems < 1 || numberOfItems > 5) {
        controller.set('enableGenerateTableBtn', false);
      }
    },

    disableGenerateBtn: function(subjectId) {
      let controller = this;
      let currentSubjectId = controller.get('subjectId');
      if (subjectId !== currentSubjectId) {
        controller.set('selectedFrameworks', []);
        controller.set('enableGenerateTableBtn', false);
      }
    },

    /**
    * Action triggered when user click generate table button
    */
    generateCrosswalkTable: function() {
      let controller = this;
      let selectedFrameworks = controller.get('selectedFrameworks');
      let subjectId = controller.get('subjectId');
      let crosswalkDataPromise = Ember.RSVP.resolve(controller.get('crosswalkService').getCrosswalkData(subjectId));
      return Ember.RSVP.hash({
        frameworkList: selectedFrameworks,
        crosswalkData: crosswalkDataPromise
      })
        .then(function(hash) {
          return controller.updateCrosswalkTable(hash);
        });
    }
  },

  /**
  * @param rawData of the crosswalk Data
  * Method to update the crosswalk table
  */
  updateCrosswalkTable: function(rawData) {
    let controller = this;
    let crosswalkData = rawData.crosswalkData;
    let frameworkList = rawData.frameworkList;
    let defaultHeaderItems = controller.get('defaultTableHeaderItems');
    let tableHeader = defaultHeaderItems.concat(frameworkList);
    let numberOfColumns = tableHeader.length;
    let tableBody = [];
    crosswalkData.map(data => {
      let tableRowData = [];
      tableRowData.length = numberOfColumns;
      tableRowData.fill('');
      tableRowData[0] = truncateString(data.title);
      tableRowData[1] = data.id;
      data.crosswalkCodes.forEach(crosswalkCode => {
        let frameworkId = crosswalkCode.framework_id;
        let frameworkPosition = tableHeader.indexOf(frameworkId);
        if (frameworkList.includes(frameworkId)) {
          tableRowData[frameworkPosition] = crosswalkCode.id;
        }
      });
      tableBody.push(tableRowData);
      return true;
    });
    let tableData = {
      header: tableHeader,
      body: tableBody
    };
    controller.set('tableData', tableData);
    controller.set('showCrosswalkTable', true);
  }
});
