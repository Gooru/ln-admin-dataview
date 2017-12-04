import Ember from 'ember';
import ModalMixin from '../mixins/modal';
import Env from 'admin-dataview/config/environment';

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
      this.sendAction('logout');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
     * @property {?string} action to send up when a user logs out
     */
  onLogout: null,

  /**
     * Marketing site url
     * @property {string}
     */
  marketingSiteUrl: Ember.computed(function() {
    return Env.marketingSiteUrl;
  }),

  /**
     * Support site url
     * @property {string}
     */
  supportSiteUrl: Ember.computed(function() {
    return Env.supportSiteUrl;
  })
});
