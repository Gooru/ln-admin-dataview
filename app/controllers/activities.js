import Ember from 'ember';

export default Ember.Controller.extend({

  filterTypes: Ember.A([
    {
      'title': 'Category',
      'code': 'category'
    },
    {
      'title': 'Subject',
      'code': 'subject'
    },
    {
      'title': 'Course',
      'code': 'course'
    }
  ])
});
