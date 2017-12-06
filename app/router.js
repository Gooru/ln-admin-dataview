import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/'});
  this.route('gcm');
  this.route('crosswalk');
  this.route('activities');
  this.route('learners');
  this.route('suggest');
  this.route('sign-in');
});

export default Router;
