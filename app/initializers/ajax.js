import Ember from 'ember';
import EndPointsConfig from 'admin-dataview/utils/endpoint-config';

export default {
  name: 'ajax',
  initialize: function(/* app */) {
    Ember.$.ajaxSetup({
      cache: false,
      crossDomain: true,
      beforeSend: function(jqXHR, settings) {
        const url = settings.url;
        if (!url.startsWith('/')) {
          const endpointUrl = EndPointsConfig.getEndpointUrl();
          settings.url = `${endpointUrl}${url}`;
        }
      }
    });
  }
};
