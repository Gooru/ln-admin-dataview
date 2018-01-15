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
  this.route('learners');
  this.route('suggest');
  this.route('sign-in');
  this.route('crosswalk');
  this.route('learner', { path: '/learner/:userId' }, function() {
    this.route('journeys-taken');
    this.route('competencies');
    this.route('time-spent-courses');
    this.route('time-spent-activites');
  });
});

export default Router;
