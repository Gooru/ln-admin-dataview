import Ember from 'ember';

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

  //------------------------------------------------------------------------
  // Actions

  actions: {

    /**
    * Action triggered when user checked maximum checkboxes
    */
    frameworkLimitExceed: function(subjectId, selectedFrameworks) {
      let controller = this;
      controller.set('selectedFrameworks', selectedFrameworks);
      controller.set('subjectId', subjectId);
      controller.set('enableGenerateTableBtn', true);
    },

    /**
    * Action triggered when user click generate table button
    */
    generateCrosswalkTable: function() {
      let controller = this;
      let selectedFrameworks = controller.get('selectedFrameworks');
      let subjectId = controller.get('subjectId');
      //Add a new item at beginning of an array
      selectedFrameworks.unshift('GUT CODE');
      let crosswalkDataPromise = Ember.RSVP.resolve(controller.get('crosswalkService').getCrosswalkData(subjectId));
      return Ember.RSVP.hash({
        frameworkList: selectedFrameworks,
        crosswalkData: crosswalkDataPromise
      })
      .then(function(hash) {
        return controller.updateCrosswalkTable(hash);
      })
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
    // console.log('frameworkList', frameworkList);
    let tableBody = [];
    crosswalkData.map(data => {
      let tableRowData = [data.id];
      data.crosswalkCodes.forEach(crosswalkCode => {
        // console.log('crosswalkCode', crosswalkCode);
        let frameworkPosition = frameworkList.indexOf(crosswalkCode.framework_id);
        let frameworkId = '';
        // tableRowData[frameworkPosition] = frameworkPosition > 0 ? crosswalkCode.id : '';
        if (frameworkPosition > 0) {
          frameworkId = crosswalkCode.id;
          tableRowData[frameworkPosition] = frameworkId;
        }
      });
      tableBody.push(tableRowData);
      return true;
    });
    // console.log('tableBody', tableBody);
    let tableData = {
      header: rawData.frameworkList,
      body: tableBody
    };
    console.log('tableData', tableData);
    controller.set('tableData', tableData);
    controller.set('showCrosswalkTable', true);
  }
});
