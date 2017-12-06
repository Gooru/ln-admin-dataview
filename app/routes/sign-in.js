import Ember from 'ember';
import EndPointsConfig from 'admin-dataview/utils/endpoint-config';

export default Ember.Route.extend({

  beforeModel: function() {
    window.location.replace(`${EndPointsConfig.getGooruAppUrl()  }/sign-in`);
  }

});
