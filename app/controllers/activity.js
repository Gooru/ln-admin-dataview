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
    },
    {
      'title': '21st Century Skills',
      'code': '21-century-skills'
    },
    {
      'title': 'Licence',
      'code': 'licenses'
    },
    {
      'title': 'Depth of Knowledge',
      'code': 'dok'
    },
    {
      'title': 'Publisher',
      'code': 'publisher'
    },
    {
      'title': 'Audience',
      'code': 'audience'
    }
  ])
});
