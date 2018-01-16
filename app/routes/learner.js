import Ember from 'ember';
import AuthenticatedRouteMixin from 'admin-dataview/mixins/authenticated-route-mixin';
import {LEARNER_CHILD_ROUTES} from 'admin-dataview/config/config';
import Utils from 'admin-dataview/utils/utils';


export default Ember.Route.extend(AuthenticatedRouteMixin, {


  //------------------------------------------------------------------------
  //Properties

  //------------------------------------------------------------------------
  // Events

  actions: {


    onClickBackButton: function() {
      let pathname = Utils.getRoutePathLastOccurrence(window.location.pathname);
      if (LEARNER_CHILD_ROUTES.indexOf(pathname) > -1) {
        let controller = this.get('controller');
        this.transitionTo('learner', controller.get('userId'));
      } else {
        this.transitionTo('learners');
      }

    }
  },

  //------------------------------------------------------------------------
  //Methods

  model: function(params) {
    return params;
  },

  setupController: function(controller, model) {
    controller.set('userId', model.userId);
  }

});
