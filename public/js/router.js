$(function() {
	var AppRouter = Backbone.Router.extend({
		routes : {
			""                          : "home",
			"home/about"                : "about",
			"home/wines"                : "list",
			"home/wines/page/:page"     : "list",
			"home/wines/:id"            : "wineDetails",
		    "home/wines/add"            : "add"
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
		},
		
		wineDetails : function(id) {
            var wine = new Wine({_id: id});
            wine.fetch({success:function(){
                $('#content').html(new WineView({model: wine}).render().el);
            }});
            this.headerView.selectMenuItem();
        }
	});

	window.app = new AppRouter();
	Backbone.history.start({
		pushState : true
	});
});