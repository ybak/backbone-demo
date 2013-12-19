$(function() {
	var AppRouter = Backbone.Router.extend({
		routes : {
			""                           : "home",
			"home/about"                : "about",
			"home/wines"                : "list",
			"home/wines/page/:page"     : "list"

		},

		initialize : function() {
			this.headerView = new HeaderView();
			$('.header').html(this.headerView.render().el);
		},

		home : function() {
			if (!this.homeView) {
				this.homeView = new HomeView();
			}
			$('#content').html(this.homeView.render().el);
			this.headerView.selectMenuItem('home-menu');
		},

		about : function() {
			if (!this.aboutView) {
				this.aboutView = new AboutView();
			}
			$('#content').html(this.aboutView.render().el);
			this.headerView.selectMenuItem('about-menu');
		},

		list : function(page) {
			var p = page ? parseInt(page, 10) : 1;
			var wineList = new WineCollection();
			wineList.fetch().success(function() {
				$('#content').html(new WineListView({
					model : wineList,
					page : p
				}).render().el);
			});
			this.headerView.selectMenuItem('browse-wines');
		}
	});

	window.app = new AppRouter();
	Backbone.history.start({
		pushState : true
	});
});