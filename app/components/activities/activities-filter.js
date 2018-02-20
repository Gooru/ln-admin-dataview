import Ember from 'ember';

export default Ember.Component.extend({

  //------------------------------------------------------------------------
  //Attributes
  classNames: ['activities-filter'],

  //------------------------------------------------------------------------
  //Dependencies
  session: Ember.inject.service('session'),

  //------------------------------------------------------------------------
  //Properties
  selectedFilterItems: {},

  //------------------------------------------------------------------------
  //Actions
  actions: {
    /**
     * @function onClickCheckbox
     * Action triggered when the user click on the checkbox
     */
    onClickCheckbox: function(filterInfo, filterType){
      let component = this;
      let selectedFilterItems = component.getUpdtedFilterItems(filterInfo, filterType);
      let userId = component.get('session.id');
      component.set('selectedFilterItems', selectedFilterItems);
      if (filterType === 'category') {
        selectedFilterItems.course = [];
        selectedFilterItems.subject = [];
        component.$('.subject .header .toggle-dropdown, .course .header .toggle-dropdown').click();
      } else if (filterType === 'subject') {
        selectedFilterItems.course = [];
        component.$('.course .header .toggle-dropdown').click();
      }
      localStorage.setItem(`research_${userId}_activities_filters`, JSON.stringify(selectedFilterItems));
    },

    onSelectCenturySkills(storedFilters) {
      let component = this;
      component.sendAction('onChangeFilterItems', storedFilters);
    }
  },

  //------------------------------------------------------------------------
  //Methods

  /**
   * @function getUpdtedFilterItems
   * Method to update localStorage with latest filter selection
   */
  getUpdtedFilterItems: function(filterInfo, filterType) {
    let component = this;
    let userId = component.get('session.id');
    let storedFilters = JSON.parse(localStorage.getItem(`research_${userId}_activities_filters`)) || component.get('selectedFilterItems');
    let userSelectedFilter = storedFilters[`${filterType}`] || [];
    let userSelectedFilterIndex = userSelectedFilter.findIndex(function(item){
      return item.id === filterInfo.code;
    });
    //if filter already selected, then remove it from the list
    if (userSelectedFilterIndex > -1) {
      userSelectedFilter.splice(userSelectedFilterIndex, 1);
    } else {  //if new filter selected by user
      if (filterType === 'subject' || filterType === 'category') {
        userSelectedFilter[0] = component.getStructuredDataItemsByFilterType(filterType, filterInfo);
      } else {
        userSelectedFilter.push(component.getStructuredDataItemsByFilterType(filterType, filterInfo));
      }
    }
    storedFilters[`${filterType}`] = userSelectedFilter;
    localStorage.setItem(`research_${userId}_activities_filters`, JSON.stringify(storedFilters));
    component.sendAction('onChangeFilterItems', storedFilters);
    return storedFilters;
  },

  /**
   * @function getStructuredDataItemsByFilterType
   * Method to get structured filter data based on the filter type
   */
  getStructuredDataItemsByFilterType: function(filterType, filterInfo) {
    let userSelectedFilterItem = {};
    if (filterType === 'subject') {
      userSelectedFilterItem = {
        id: filterInfo.code,
        label: filterInfo.label,
        frameworkId: filterInfo.value.frameworkId
      };
    } else {
      userSelectedFilterItem = {
        id: filterInfo.code,
        label: filterInfo.label
      };
    }
    return userSelectedFilterItem;
  }
});
