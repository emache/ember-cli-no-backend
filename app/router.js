import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('approach');
  this.resource('projects', function() {
    this.route('view', {
      path: ':project_slug'
    });
  });
});
