define([
   'jquery',
   'underscore',
   'backbone',
   'views/game',
   'text',
   'text!/templates/layout.html'
], function($, _, Backbone, gameView, layoutTemplate){
    var AppView = Backbone.View.extend({
        el: '.container',
        template: _.template(layoutTemplate, {}),
        page: 1,
        
        render: function(){
            this.$el.html("");
            this.$el.append(this.template);
            new gameView();
        }
    });
    
    return new AppView();
});