import Ember from 'ember';
import { GRADE_PREFERENCE } from 'admin-dataview/config/config';

/**
 * Component for comparative search box
 */
export default Ember.Component.extend({
  classNames: ['comparative-search-box'],

  // --------------------------------------------------------------
  // Properties

  /**
   * @property {string} searchTerms hold search string
   */
  searchTerms: '',

  /**
   * @property {Array} gradeList hold list of grades
   */
  gradeList: GRADE_PREFERENCE,

  /**
   * @property {Object} selectedGrade hold active grade user
   */
  selectedGrade: null,

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
  }
});
