import Ember from 'ember';
import ModalMixin from 'admin-dataview/mixins/modal';


export default Ember.Controller.extend(ModalMixin, {

  // --------------------------------------------------------------------------
  // Query params

  //------------------------------------------------------------------------
  // Events

  actions: {

    onClickBackButton: function() {
      let pathname = window.location.pathname;
      let pathLists = pathname.split('/');
      if (pathLists.length === 4) {
        this.transitionToRoute('learners');
      } else {
        this.transitionToRoute('learner', this.get('userId'));
      }
    },

    onClickProfileInfo: function() {
      let controller = this;
      let user = controller.get('user');

      let modalData = {
        user: user
      };
      // Open user profile info modal once user click thumbnail
      controller.send('showModal', 'modals.learner.user-profile-modal', modalData);
    },

    onFilterSelection: function(activeDuration) {
      this.send('onSelectActiveDuration', activeDuration);
    }

  }

  // --------------------------------------------------------------------------
  // Properties


});
