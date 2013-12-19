$(function() {
	window.Wine = Backbone.Model.extend({
		idAttribute: "_id"
	});
	
	window.WineCollection = Backbone.Collection.extend({
		model:  Wine,
		url: "/api/wines"
	});
});




