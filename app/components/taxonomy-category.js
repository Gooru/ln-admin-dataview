import Ember from 'ember';
import {
  TAXONOMY_CATEGORIES
} from 'admin-dataview/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy-category'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Set Category
     */
    onChooseCategory: function(category) {
      this.set('selectedCategory', category.value);
      this.sendAction('onChooseCategory', category);
    }
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Ember.A} categories - List of taxonomy subject categories
   */
  categories: TAXONOMY_CATEGORIES,

  /**
   * It will maintain the selected category, by default it will k_12
   */
  selectedCategory: 'k_12'

});
