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
    window.WineView = Backbone.View.extend({
        template : _.template($('#wine-template').html()),
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    window.WineListView = Backbone.View.extend({
        initialize : function(options) {
            this.page = options.page;
        },
        render : function() {
            var wines = this.model.models;
            var len = wines.length;
            var startPos = (this.page - 1) * 8;
            var endPos = Math.min(startPos + 8, len);
            $(this.el).html('<ul class="thumbnails"></ul>');
            for ( var i = startPos; i < endPos; i++) {
                $('.thumbnails', this.el).append(new WineListItemView({
                    model : wines[i]
                }).render().el);
            }
            $(this.el).append(new Paginator({
                model : this.model,
                page : this.page
            }).render().el);
            return this;
        }
    });
    window.WineListItemView = Backbone.View.extend({
        tagName : "li",
        template : _.template($('#list-item-template').html()),
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        }
    });
    window.Paginator = Backbone.View.extend({
        className : "pagination pagination-centered",
        initialize : function(options) {
            this.model.bind("reset", this.render, this);
            this.page = options.page;
        },
        render : function() {
            var items = this.model.models;
            var len = items.length;
            var pageCount = Math.ceil(len / 8);
            $(this.el).html('<ul />');
            for ( var i = 0; i < pageCount; i++) {
                $('ul', this.el).append("<li" + ((i + 1) === this.page ? " class='active'" : "") + "><a href='/home/wines/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
            }
            return this;
        }
    });

});
