import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['app-crosswalk-table'],

  // -------------------------------------------------------------------------
  // Events
  didRender: function() {
    let component = this;
    component._super(...arguments);
    let numberOfColumns = component.get('tableData.header').length;
    component.$('.thead .td').css('width', `calc(100% / ${numberOfColumns})`);
    component.$('tbody tr td').css('width', `calc(100% / ${numberOfColumns})`);
    $('.table-structure').animate({scrollTop: 0});
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
    * Move the scroll to top when user click up arrow
    */
    scrollTop: function() {
      let component = this;
      component.sendAction('onToggleSubjectBrowser').then(function() {
        $('.crosswalk-body').animate({
          scrollTop: 0
        });
      });

    }
  }
});
