import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['competencies-matric-header'],

  actions: {
    onChangeHeaderView(selectedView) {
      let component = this;
      component.sendAction('onChangeHeaderView', selectedView);
    }
  }
});
