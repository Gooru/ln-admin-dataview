import Ember from 'ember';
import { PERMISSION_LIST } from 'admin-dataview/config/config';
import { hasAccess } from 'admin-dataview/helpers/has-access';

/**
 * Component for comparative search box
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------
  // Attributes
  classNames: ['comparative-search-box'],

  // -----------------------------------------------------------
  // Dependencies

  /**
   * taxonomy service
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  // --------------------------------------------------------------
  // Properties

  /**
   * @property {string} searchTerms hold search string
   */
  searchTerms: '',

  /**
   * @property {Array} gradeList hold list of grades
   */
  gradeList: [],

  /**
   * @property {Object} selectedGrade hold active grade user
   */
  selectedGrade: null,

  /**
   * @property {Object}
   * holding permission for all pages
   */
  permissionList: PERMISSION_LIST,

  /**
   * @property {Boolean}
   * checking
   */
  hasSearchAccess: Ember.computed(function() {
    return (
      hasAccess(['catalog', this.get('permissionList.catalogSearchFilter')]) ||
      hasAccess(['catalog', this.get('permissionList.catalogDashboard')])
    );
  }),

  // ------------------------------------------------------------
  // Hooks
  didInsertElement() {
    this.fetchUserProfileGrades();
  },

  // --------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action trigger when click search button icon
     */
    onSearchTerms() {
      let component = this;
      let searchTerms = component.get('searchTerms');
      if (searchTerms) {
        component.sendAction('onSearchTerms', searchTerms);
      }
    },

    /**
     * Action trigger when click on back arrow
     */
    backToCatalog() {
      this.sendAction('backToCatalog');
    },

    /**
     * Action trigger when click personalize dropdown
     */
    togglePeronalizeList() {
      let component = this;
      component.$('.personalize-grade-dropdown').slideToggle(500);
    },

    /**
     * Action trigger when click user in personalize grade list
     */
    onSelectGrade(grade = null) {
      let component = this;
      component.send('togglePeronalizeList');
      component.set('selectedGrade', grade);
      component.sendAction('onSelectGrade', grade);
    }
  },

  // --------------------------------------------------------------------
  // Methods
  /**
   * @function fetchUserProfileGrades
   */
  fetchUserProfileGrades() {
    let component = this;
    component
      .get('taxonomyService')
      .fetchUserProfileGrades()
      .then(gradeList => {
        if (!component.get('isDestroyed')) {
          component.set('gradeList', gradeList);
        }
      });
  }
});
