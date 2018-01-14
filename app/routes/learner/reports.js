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
  }
  ]),

  timeSpentActivities: Ember.A([{
    label: 'webpages',
    value: 3600
  },
  {
    label: 'interactive',
    value: 5009
  },
  {
    label: 'text',
    value: 7688
  },
  {
    label: 'video',
    value: 1234
  },
  {
    label: 'audio',
    value: 3450
  }
  ]),


  setupController: function(controller) {
    controller.set('courseAndIndependentJourneysData', this.get('courseAndIndependentJourneysData'));
    controller.set('competenciesData', this.get('competenciesData'));
    controller.set('timeSpentActivities', this.get('timeSpentActivities'));

  }

});
