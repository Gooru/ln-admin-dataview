import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['resource-pullup-popup'],

  /**
   * @return {Array} content
   */
  content: Ember.A(),

  /**
   * @return {string} content
   */
  type: null,

  actions: {
    onClose() {
      this.sendAction('onClose');
    }
  }
});
