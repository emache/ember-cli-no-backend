/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var funnel = require('broccoli-funnel');
var md2json = require('./broccoli/index');

var app = new EmberApp();

var convertedMD = md2json('./data/projects', {
    inputFiles: ['*.md', '**/*.md'],
    destDir: 'api/projects/',
    indexData: ['title', 'someOtherMetaData', 'featuredImgUrl']
});

var projectsDataApi = funnel('api/projects', {
    destDir: 'api/projects/'
});

var projectsAssets = funnel('data/projects/assets', {
    destDir: 'api/projects/assets/'
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree([projectsDataApi, projectsAssets]);
