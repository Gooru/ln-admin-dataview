import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Computed property to store pull out data contents
   */
  contents: Ember.computed('pullOutData', function() {
    let component = this;
    let pullOutData = component.get('pullOutData');
    let contents = [];
    if (pullOutData) {
      contents = pullOutData.contents;
    }
    return contents;
  })
});
