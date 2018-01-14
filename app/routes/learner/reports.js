import Ember from 'ember';

export default Ember.Route.extend({

  courseAndIndependentJourneysData: Ember.A([{
    name: 'Independent Journeys',
    value: 4
  },
  {
    name: 'Courses',
    value: 2
  }
  ]),

  competenciesData: Ember.A([{
    label: 'mastered',
    value: 1
  },
  {
    label: 'in-progress',
    value: 2
  }]),

  setupController: function(controller) {
    controller.set('courseAndIndependentJourneysData', this.get('courseAndIndependentJourneysData'));
    controller.set('competenciesData', this.get('competenciesData'));
  }

});
