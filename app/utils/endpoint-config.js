import ConfigurationService from 'admin-dataview/services/configuration';

/**
 * Get endpoint url from config
 */
export function getEndpointUrl() {
  const configuration = ConfigurationService.configuration;
  return configuration ? configuration.get('endpoint.url') : '';
}

/**
 * Get endpoint secure url from config
 */
export function getEndpointSecureUrl() {
  const configuration = ConfigurationService.configuration;
  return configuration ? configuration.get('endpoint.secureUrl') : '';
}

/**
 * Get Gooru application site avatarUrl
 */
export function getGooruAppUrl() {
  const configuration = ConfigurationService.configuration;
  return configuration ? configuration.get('gooru-app-url') : '';
}

/**
 * Get DS endpoint secure url from config
 */
export function geDSEndpointSecureUrl() {
  const configuration = ConfigurationService.configuration;
  return configuration ? configuration.get('dsendpoint.secureUrl') : '';
}

/**
 * Get DS endpoint  url from config
 */
export function geDSEndpointUrl() {
  const configuration = ConfigurationService.configuration;
  return configuration ? configuration.get('dsendpoint.url') : '';
}
