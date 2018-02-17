import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Query

  queryParams: ['term'],

  // -------------------------------------------------------------------------
  // Properties

  term: ''
});
