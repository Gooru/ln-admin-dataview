import Ember from 'ember';
import ModalMixin from '../mixins/modal';
import Env from 'admin-dataview/config/environment';
import { hasAccess } from 'admin-dataview/helpers/has-access';
import { PERMISSION_LIST } from 'admin-dataview/config/config';

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

  demoUserService: Ember.inject.service('api-sdk/countries'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['app-header', 'navbar-fixed-top'],

  tagName: 'header',

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    logout() {
      let userId = this.get('session.id');
      localStorage.removeItem(`research_${userId}_activities_filters`);
      localStorage.removeItem('MC_DEMO_SESSION');
      this.sendAction('logout');
    },

    onMenuItemSelection(item) {
      this.sendAction('onMenuItemSelection', item);
    },

    onToggleDropdown() {
      this.$('.role-list').slideToggle();
    },

    onSelectRole(role) {
      localStorage.setItem('MC_UPDATE_LOGIN', JSON.stringify(role));
      window.location.href = '/login';
    }
  },

  // ----------------------------------------------------------------------------------------------
  // Methods

  loadRoles() {
    this.get('demoUserService')
      .getDemoUserAccounts()
      .then(role => {
        let roleList = this.get('roleList');
        let superUser = {};
        superUser = {
          username: this.get('demoUser')
            ? this.get('demoUser.username')
            : 'Super User',
          name: 'Super User',
          code: 'DEMO_USER'
        };
        const userExist = role.findBy('username', superUser.username);
        roleList = userExist ? role : [...[superUser], ...role];
        this.set('roleList', roleList);
      });
  },

  // ----------------------------------------------------------------------------------------------
  // Hooks
  didInsertElement() {
    this.loadRoles();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Support site url
   * @property {string}
   */
  supportSiteUrl: Ember.computed(function() {
    return Env.supportSiteUrl;
  }),

  /**
   * Holding initial role list
   */
  roleList: Ember.A([]),

  demoUser: Ember.computed(function() {
    return localStorage.getItem('MC_DEMO_SESSION')
      ? JSON.parse(localStorage.getItem('MC_DEMO_SESSION'))
      : this.get('session.user');
  }),

  isShowRoleDropdownList: Ember.computed(function() {
    return (
      localStorage.getItem('MC_DEMO_SESSION') ||
      hasAccess(['all', PERMISSION_LIST.all]) ||
      hasAccess(['nav', PERMISSION_LIST.roleView])
    );
  }),

  isActiveCode: Ember.computed(function() {
    return this.get('session.user.username');
  })
});
