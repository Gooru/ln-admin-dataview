import Ember from 'ember';

export default Ember.Component.extend({
  /**
  * Breadcrumb information of the selected node
  */
  breadcrumb: Ember.computed('nodeData', function() {
    let component = this;
    return component.get('nodeData.parent');
  })
});
