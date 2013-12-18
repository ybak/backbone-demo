$(function() {
    var AppRouter = Backbone.Router.extend({
        routes : {
            ""                  : "home",
            "about"             : "about"
        },
        
        initialize: function() {
            this.headerView = new HeaderView();
            $('.header').html(this.headerView.render().el);
        },
        
        home: function() {
            if(!this.homeView){
                this.homeView = new HomeView();
            }
            $('#content').html(this.homeView.render().el);
            this.headerView.selectMenuItem('home-menu');
        },

        about: function() {
            if(!this.aboutView){
                this.aboutView = new AboutView();
            }
            $('#content').html(this.aboutView.render().el);
            this.headerView.selectMenuItem('about-menu');
        }
    });
    
    window.app = new AppRouter();
    Backbone.history.start({pushState: true});
});