$(function() {
    window.HeaderView = Backbone.View.extend({
        events : {
            "click a" : "clicked"
        },
        template : _.template($('#header-template').html()),
        render : function() {
            this.$el.html(this.template());
            return this;
        },
        selectMenuItem : function(menuItem) {
            this.$el.find('.nav li').removeClass('active');
            if (menuItem) {
                this.$el.find('.' + menuItem).addClass('active');
            }
        },
        clicked : function(e) {
            e.preventDefault();
            app.navigate($(e.target).attr('href'), true);
        }
    });
    window.HomeView = Backbone.View.extend({
        template : _.template($('#home-template').html()),
        render : function() {
            this.$el.html(this.template());
            return this;
        }
    });
    window.AboutView = Backbone.View.extend({
        template : _.template($('#about-template').html()),
        render : function() {
            this.$el.html(this.template());
            return this;
        }
    });

});
