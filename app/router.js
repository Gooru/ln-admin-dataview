import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/'});
  this.route('sign-in');
  this.route('sign-up');
  this.route('forgot-password');
});

export default Router;
