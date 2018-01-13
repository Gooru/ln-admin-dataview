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

  setupController: function(controller) {
    controller.set('courseAndIndependentJourneysData', this.get('courseAndIndependentJourneysData'));
  }

});
