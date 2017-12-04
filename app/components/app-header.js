import Ember from 'ember';
import ModalMixin from '../mixins/modal';
import Env from 'admin-dataview/config/environment';
import EndPointsConfig from 'admin-dataview/utils/endpoint-config';

/**
 * Application header component
 * @see application.hbs
 *
 *
 * @module
 * @typedef {object} AppHeader
 */
export default Ember.Component.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  session: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Properties
  isAuthenticated: Ember.computed.alias('session.isAuthenticated'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['app-header', 'navbar-fixed-top'],

  tagName: 'header',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    logout: function() {
      this.get('session').invalidate();
      window.location.href =  window.location.protocol + EndPointsConfig.getGooruAppUrl() + "/logout";
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Support site url
   * @property {string}
   */
  supportSiteUrl: Ember.computed(function() {
    return Env.supportSiteUrl;
  })
});
