import Ember from 'ember';


export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Subject base learner profile distribution
   * @return {Object}
   */
  subjects: Ember.computed.alias('learnersProfileDistribution.subjects'),

  /**
   * geo location based learner profile distribution
   * @return {Object}
   */
  geoLocations: Ember.computed.alias('learnersProfileDistribution.geoLocations')


  // -------------------------------------------------------------------------
  // Events

});
