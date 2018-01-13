import Ember from 'ember';
import ModalMixin from 'admin-dataview/mixins/modal';


export default Ember.Controller.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Events
  init: function() {
    this.send('showModal', 'modals.learners-search');
  }
});
