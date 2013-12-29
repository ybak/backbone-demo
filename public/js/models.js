$(function() {
    window.Wine = Backbone.Model.extend({
        urlRoot : "/api/wines",
        idAttribute : "_id",
        validation: {
            name: {
                required: true,
                msg: 'You must enter a name'
            },
            grapes: {
                required: true,
                msg: 'You must enter a grape variety'

            },
            country: {
                required: true,
                msg: '"You must enter a country'

            }
        },

        defaults : {
            _id : null,
            name : "",
            grapes : "",
            country : "USA",
            region : "California",
            year : "2012",
            description : "",
            picture : null
        }
    });

    window.WineCollection = Backbone.Collection.extend({
        model : Wine,
        url : "/api/wines"
    });
});
