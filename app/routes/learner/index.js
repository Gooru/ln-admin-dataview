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

  timeSpentCourses: Ember.A([{
    label: 'Algebra I',
    value: 36000
  },
  {
    label: 'Algebra II',
    value: 50090
  },
  {
    label: 'Biology',
    value: 76880
  },
  {
    label: 'Zoology',
    value: 12340
  },
  {
    label: 'History',
    value: 34500
  },
  {
    label: 'Computer Science',
    value: 34500
  }
  ]),


  setupController: function(controller, model) {
    controller.set('courseAndIndependentJourneysData', this.get('courseAndIndependentJourneysData'));
    controller.set('competenciesData', this.get('competenciesData'));
    controller.set('timeSpentActivities', this.get('timeSpentActivities'));
    controller.set('timeSpentCourses', this.get('timeSpentCourses'));
    controller.set('userId', model.userId);
  }

});
