import Ember from 'ember';
import ModalMixin from '../mixins/modal';
import Env from 'admin-dataview/config/environment';
import { hasAccess } from 'admin-dataview/helpers/has-access';

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
      localStorage.removeItem('DEMO_ACTIVE');
      this.sendAction('logout');
    },

    onMenuItemSelection(item) {
      this.sendAction('onMenuItemSelection', item);
    },

    onToggleDropdown() {
      this.$('.role-list').slideToggle();
    },

    onSelectRole(role) {
      window.localStorage.MC_UPDATE_LOGIN = JSON.stringify(role);
      window.localStorage.DEMO_ACTIVE = JSON.stringify(role);
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
    return window.localStorage.MC_DEMO_SESSION
      ? JSON.parse(window.localStorage.MC_DEMO_SESSION)
      : this.get('session');
  }),

  isShowRoleDropdownList: Ember.computed(function() {
    return (
      window.localStorage.MC_DEMO_SESSION ||
      hasAccess(['all', 'all']) ||
      hasAccess(['nav', 'role-view'])
    );
  }),

  isActiveCode: Ember.computed(function() {
    return window.localStorage.DEMO_ACTIVE
      ? JSON.parse(window.localStorage.DEMO_ACTIVE).code
      : this.get('roleList')[0];
  })
});
