$(function() {
    window.Wine = Backbone.Model.extend({
        urlRoot : "/api/wines",
        idAttribute : "_id",
        defaults : {
            _id : null,
            name : "",
            grapes : "",
            country : "USA",
            region : "California",
            year : "",
            description : "",
            picture : null
        }
    });

    window.WineCollection = Backbone.Collection.extend({
        model : Wine,
        url : "/api/wines"
    });
});
