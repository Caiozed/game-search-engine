define([
    'underscore',
    'backbone',
    'app'
], function(_, Backbone, AppView){
    var AppRouter = Backbone.Router.extend({
       routes: {
           "": "index",
           "*action": "default"
       },
       
       index: function(){
           AppView.render();
       },
       
       default: function(action){
           alert(action);
       }
    });
    
    var initialize = function(){
        var appRouter = new AppRouter();
        Backbone.history.start();
    };
    
    return {initialize: initialize};
});