import Env from 'admin-dataview/config/environment';

/**
 * Initialize the configuration settings from config file.
 * @param  {Object} instance
 */
export function initialize(instance) {
  const configurationService = instance.container.lookup('service:configuration');
  const awProps = Env.APP.awProps;
  const configBaseUrl = awProps ? awProps.appRootPath : undefined;
  configurationService.loadConfiguration(configBaseUrl).then(function() {
    instance.application.advanceReadiness();
  });
}

export default {
  name: 'application-configuration',
  initialize: initialize
};
