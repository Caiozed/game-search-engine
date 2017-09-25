define([
    'jquery',
    'underscore',
    'backbone',
    'views/twitter_user'
], function($, _, Backbone, userView){
    var TwitterUsers = Backbone.Collection.extend({
        initialize: function(){
            this.on('add', this.showUsers);
        },
        
        showUser: function(user){
            var view = new userView({model: user});
        },
        
        showUsers: function(){
            var that = this;
          _.each(this.models, function(user){
            that.showUser(user);
          });
       }
    })
    
    return TwitterUsers;
});