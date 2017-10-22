// /public/js/router/router.js

var app = app || {};

// BACKBONE ROUTER:_________________________________________________________
app.Router = Backbone.Router.extend( {

    // Called when the ROUTER is first created
    initialize: function () {
        console.log( 'ROUTER: ', 'Router - has been initialized' );
    },

    /* define the route and function maps for this router */
    routes: {
        '': 'portfolioView',
        'upload': 'uploadView',
        'images/:imgId': 'imageView'
    },

    portfolioView: function () {
        console.log( 'ROUTER: ', 'fn: portfolioView' );

        var portfolioCollection = new app.PortfolioCollection;
        console.log( 'ROUTER: ', 'fn: portfolioView - portfolioCollection = ', portfolioCollection );

        this.view = new app.PortfolioView( {
            el: '#imageBoard',
            collection: portfolioCollection
        } );

        // this.view = new app.PortfolioView( this.images );

    },

    uploadView: function () {
        console.log( 'ROUTER: ', 'fn: uploadView' );
        Backbone.trigger('uploadImageView:open'); // logs: Handled Backbone event
    },

    imageView: function ( imgId ) {
        console.log( 'ROUTER: ', 'fn: imageView', `imgId: ${imgId}` );
    },

} );

var router = new app.Router;

Backbone.history.start();
