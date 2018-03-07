import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller) {
    controller.set('enableGenerateTableBtn', false);
    controller.set('showCrosswalkTable', false);
    controller.set('showSubjectBrowser', true);
    controller.set('selectedFrameworks', []);
  }
});
