import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),


  /**
   * Session Service
   */
  session: Ember.inject.service('session')

  //-------------------------------------------------------------------------
  //Properties


  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods


});
