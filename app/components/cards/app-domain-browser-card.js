import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards', 'app-domain-browser-card'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.$('.category .k_12').addClass('active');
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when the user select a data item
     */
    onSelectDataItem(type, dataItem) {
      let component = this;
      let id = dataItem.id || dataItem.value;
      component.toggleActiveElement(type, id);
      component.sendAction('onSelectDataItem', type, dataItem);
    },

    /**
     * Action triggered when the user select a domain item
     */
    onSelectDomain(domainId) {
      let component = this;
      component.sendAction('onSelectDomain', domainId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  /**
   * @function toggleActiveElement
   * Method to toggle active element
   */
  toggleActiveElement(type, id) {
    let component = this;
    id = id.replace(/\./g, '-');
    component.$(`.${type} .item`).removeClass('active');
    component.$(`.${type} .${id}`).addClass('active');
  }
});
