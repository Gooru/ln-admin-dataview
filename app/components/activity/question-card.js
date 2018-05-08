import Ember from 'ember';
import TaxonomyTag from 'admin-dataview/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'admin-dataview/models/taxonomy/taxonomy-tag-data';
import PLAYER_WINDOW_NAME from 'admin-dataview/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['activity-question-card'],

  // -------------------------------------------------------------------------
  // Events

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * question object
   * @type {Object}
   */
  question: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed(
    'question.standards.[]',
    function() {
      let standards = this.get('question.standards');
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  ),

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    getQuestionInfo: function(resource) {
      this.sendAction('getQuestionInfo', resource);
    },

    onPlayQuestion(questionId) {
      let locOrigin = window.location.origin;
      let questionUrl = `/content/questions/play/${questionId}?source=rgo`;
      let playerURL = locOrigin + questionUrl;
      window.open(playerURL, PLAYER_WINDOW_NAME);
    }

  }

});
