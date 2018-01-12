import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/'});
  this.route('gcm');
  this.route('activities');
  this.route('learners', function() {});
  this.route('suggest');
  this.route('sign-in');
  this.route('crosswalk');

  this.route('learner', function() {
    this.route('reports', { path: '/:userId/reports'});
    this.route('journeys-taken', { path: '/:userId/journeys-taken'});
    this.route('proficiency', { path: '/:userId/proficiency'});
    this.route('profile', { path: '/:userId/profile'});
    this.route('markers', { path: '/:userId/markers'});
    this.route('preferences', { path: '/:userId/preferences'});
  });
});

export default Router;
