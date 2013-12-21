$(function() {
	window.Wine = Backbone.Model.extend({
	    urlRoot: "/api/wines",
		idAttribute: "_id"
	});
	
	window.WineCollection = Backbone.Collection.extend({
		model:  Wine,
		url: "/api/wines"
	});
});




