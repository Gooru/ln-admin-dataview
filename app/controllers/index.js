import Ember from 'ember';

export default Ember.Controller.extend({

  // --------------------------------------------------------------------------
  // Query params

  queryParams: ['access_token'],
  
  session: null
});
