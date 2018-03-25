import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cards', 'app-domain-browser-card'],

  didInsertElement() {
    let component = this;
    component.$('.category .k_12').addClass('active');
  },

  actions: {
    onSelectDataItem(type, dataItem) {
      let component = this;
      let id = dataItem.id || dataItem.value;
      component.toggleActiveElement(type, id);
      component.sendAction('onSelectDataItem', type, dataItem);
    },

    onSelectDomain(domainId) {
      let component = this;
      component.sendAction('onSelectDomain', domainId);
    }
  },

  toggleActiveElement(type, id) {
    let component = this;
    id = id.replace(/\./g, '-');
    component.$(`.${type} .item`).removeClass('active');
    component.$(`.${type} .${id}`).addClass('active');
  }
});
