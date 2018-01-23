import Ember from 'ember';
import EndPointsConfig from 'admin-dataview/utils/endpoint-config';
import config from 'admin-dataview/config/environment';

export default {
  name: 'ajax',
  initialize: function(/* app */) {
    Ember.$.ajaxSetup({
      cache: false,
      crossDomain: true,
      beforeSend: function(jqXHR, settings) {
        const url = settings.url;
        if (url.startsWith('/api') || url.startsWith('/gooru-search')) {
          const endpointUrl = EndPointsConfig.getEndpointUrl();
          settings.url = `${endpointUrl}${url}`;
        } else if (url.startsWith('config/') || url.startsWith('stubs/')) {
          const basePath = (`${window.location.protocol  }//${  window.location.host}`);
          settings.url = basePath + config.rootURL + url;
        }
      }
    });
  }
};
