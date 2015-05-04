/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var funnel = require('broccoli-funnel');
var marked = require('marked');
var yaml = require('js-yaml');
var fs = require('fs');
var glob = require('glob');

var app = new EmberApp();

var loadFile = function (ymlName) {
    var data = fs.readFileSync(ymlName, "utf8");
    var project = {};
    var dividerPos = data.indexOf("\n---\n");
    project.description = marked(data.substr(dividerPos + 6));

    var doc = yaml.safeLoad(data.substr(0, dividerPos));
    project.colour = doc.colour;
    project.date = doc.date;
    project.title = doc.title;
    project.slug = doc.slug;
    project.previewImgUrl = doc.previewImgUrl;
    project.featuredImgUrl = doc.featuredImgUrl;
    
    return project;
};

var convertProjectsFiles = function() {
    var index = [];
    var ymls = glob('data/projects/*.md', {sync: true});
    
    console.log("Converting " + ymls.length + " files");

    ymls.forEach(function (ymlName) {
        // Load
        var project = loadFile(ymlName);
        var fileName = ymlName.replace('data/projects/', '').replace('.md', '');
        fs.writeFileSync('api/projects/' + fileName + '.json', JSON.stringify(project));
        // Store summary for index
        index.push(
            {
                title: project.title,
                someOtherMetaData : project.someOtherMetaData,
                featuredImgUrl: project.featuredImgUrl,
                slug: fileName
            });
    });
    
    fs.writeFileSync('api/projects/index.json', JSON.stringify(index));
};


convertProjectsFiles();

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
