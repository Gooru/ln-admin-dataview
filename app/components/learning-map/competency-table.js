import Ember from 'ember';
import { LEARNING_MAP_CONTENT_SEQUENCE } from 'admin-dataview/config/config';

export default Ember.Component.extend({
  classNames: ['learning-map', 'competency-table'],

  contentSequence: LEARNING_MAP_CONTENT_SEQUENCE,

  didInsertElement() {
    let component = this;
    component.setupScrollable();
  },

  actions: {
    /**
     * Action triggered when the user click up arrow
     */
    onScrollTop() {
      Ember.$('.browser-container').show();
      Ember.$('.learning-map-container').animate(
        {
          scrollTop: 0
        },
        'slow'
      );
    }
  },

  setupScrollable() {
    let component = this;
    const $competencyTable = component.$('.table-structure');
    $competencyTable.scroll(function() {
      let isEnd =
        $competencyTable.scrollTop() + $competencyTable.innerHeight() >=
        $competencyTable[0].scrollHeight;
      if (isEnd) {
        component.sendAction('onScrollBottom');
      }
    });
  }
});
