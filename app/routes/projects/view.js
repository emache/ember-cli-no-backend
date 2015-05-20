import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        var url = "/api/projects/" + params.project_slug + ".json";
        return Ember.$.getJSON(url).then(function (results) {
            return results;
        });
     }
});
