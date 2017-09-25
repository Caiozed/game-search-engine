define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'text!templates/game.html'
], function($, _, Backbone, gameTemplate){
    var GameView = Backbone.View.extend({
        el: ".games-container",
        template: _.template(gameTemplate, {}),
        offset: 0,
        
        games: {},
        events: {
            "click #search" : "searchGame",
            "keypress #game_name": function(event){
                if(event.which == 13){
                    this.searchGame();
                }
            },
            "click #more": "listGames"
        },
        
        initialize: function(){
            this.listGames();
        },
        
        request: function(url, callback){
            var button =  $("#more");
            if(button.text() != "Loading..." ){
                button.text("Loading...");
                $.ajax({
                    url: url, 
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'jsonp',
                    jsonp: 'json_callback',
                    success: function(response){
                        callback(response);
                        button.text("More");
                    }
                });
            }
        },
        
        
        listGames: function(){
            var that = this;
            var url = "https://www.giantbomb.com/api/games/?api_key=415dab807f17da436cce3e0c6b5653fc218c44ff&format=jsonp&limit="+10+"&field_list=name,image,site_detail_url,platforms,original_game_rating,original_release_date,site_detail_url&offset="+this.offset+"&sort=name:asc";
            this.request(url, function(response){
                that.games = response.results;
                that.offset += 10;
                that.render();
            });
        },
        
        searchGame: function(){
            var that = this;
            var query = $('#game_name').val().trim(); 
            var url = "https://www.giantbomb.com/api/search/?api_key=415dab807f17da436cce3e0c6b5653fc218c44ff&format=jsonp&query="+query+"&field_list=name,image,site_detail_url,platforms,original_game_rating,original_release_date,site_detail_url&sort=name:asc";
            this.request(url, function(response){
                that.games = response.results;
                that.offset = 0;
                that.$el.find(".games-widget").html("");
                that.render();
            });
        },
        
        render: function(){
            var that = this;
            _.each(this.games, function(game){
                that.$el.find(".games-widget").append(that.template(game, _));
            });
        }
    });
    
    return GameView;
});