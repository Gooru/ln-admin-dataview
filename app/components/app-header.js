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
        roleList = roleList.concat(role);
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
  roleList: Ember.computed(function() {
    let list = Ember.A([
      Ember.Object.create({
        name: 'Super User',
        code: 'DEMO_USER'
      })
    ]);
    return list;
  }),

  demoUser: Ember.computed(function() {
    return JSON.parse(window.localStorage.MC_DEMO_SESSION);
  }),

  isShowRoleDropdownList: Ember.computed(function() {
    return window.localStorage.MC_DEMO_SESSION;
  }),

  isActiveCode: Ember.computed(function() {
    return window.localStorage.DEMO_ACTIVE
      ? JSON.parse(window.localStorage.DEMO_ACTIVE).code
      : 'DEMO_USER';
  })
});
