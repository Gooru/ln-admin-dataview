import Ember from 'ember';
import ModalMixin from 'admin-dataview/mixins/modal';
import {LEARNER_CHILD_ROUTES} from 'admin-dataview/config/config';
import Utils from 'admin-dataview/utils/utils';


export default Ember.Controller.extend(ModalMixin, {

  // --------------------------------------------------------------------------
  // Query params

  //------------------------------------------------------------------------
  // Events

  actions: {

    onClickBackButton: function() {
      let pathname = Utils.getRoutePathLastOccurrence(window.location.pathname);
      if (LEARNER_CHILD_ROUTES.indexOf(pathname) > -1) {
        this.transitionToRoute('learner', this.get('userId'));
      } else {
        this.transitionToRoute('learners');
      }
    },

    onClickProfileInfo: function() {
      let controller = this;
      let user = controller.get('user');

      let modalData = {
        user: user
      };
      // controller.toggleProperty('isShowProfileContainer');
      controller.send('showModal', 'modals.learner.user-profile-modal', modalData);
    }

  }

  // --------------------------------------------------------------------------
  // Properties


});
