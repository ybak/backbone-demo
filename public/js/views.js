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
        events : {
            "change"                 : "change",
            "click .save"           : "save",
            "click .delete"         : "delete"
        },
        template : _.template($('#wine-template').html()),
        initialize: function () {
            Backbone.Validation.bind(this);
        },
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        change: function(event){
            var change = {};
            var target = event.target;
            change[target.name] = target.value;
            this.model.set(change);
        },
        save: function () {
            var self = this;
            var valid = this.model.save().done(function(model){
                self.render();
                app.navigate('home/wines/' + self.model.id, false);
                utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
            }).fail(function(){
                    utils.showAlert('Error!', 'Wine saved failed.', 'alert-error');
            });
        },
        delete: function(){
            this.model.destroy().success(function(){
                alert('Wine deleted successfully');
                app.navigate('home/wines', true);
            });
        }
    });
    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.control-group');

            $group.removeClass('error');
            $group.find('.help-inline').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.control-group');
            $group.addClass('error');
            $group.find('.help-inline').html(error).removeClass('hidden');
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
