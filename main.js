require.config({
  paths: {
        jquery: 'libs/jquery-3.2.1.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        
        text: 'libs/text'
    },
    
    shim: {
        jquery: {
            exports: '$'
        },
        
        underscore: {
            exports: '_'
        },
        
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require([
    'router'
], function(Router){
    Router.initialize();
})