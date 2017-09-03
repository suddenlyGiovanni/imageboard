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

        // var portfolioCollection = new app.PortfolioCollection;
        // console.log( 'ROUTER: ', 'fn: portfolioView - portfolioCollection = ', portfolioCollection );
        // this.view = new app.PortfolioView( {
        //     el: '#imageBoard',
        //     collection: portfolioCollection
        // } );

        this.view = new app.PortfolioView( this.images );

    },

    uploadView: function () {
        console.log( 'ROUTER: ', 'fn: uploadView' );
        Backbone.trigger('uploadImageView:open'); // logs: Handled Backbone event
    },

    imageView: function ( imgId ) {
        console.log( 'ROUTER: ', 'fn: imageView', `imgId: ${imgId}` );
    },


    images : [

        {
            imgId: 0,
            imgFilename: 'https://placeimg.com/400/300/tech/grayscale',
            imgTitle: 'Title 0',
            imgAuthor: 'Author 0',
            imgDescription: 'Lorem Ipsum 0',
            imgCreatedAt: '00 00 0000'
        },

        {
            imgId: 1,
            imgFilename: 'https://placeimg.com/400/300/tech/grayscale',
            imgTitle: 'Title 1',
            imgAuthor: 'Author 1',
            imgDescription: 'Lorem Ipsum 1',
            imgCreatedAt: '11 11 1111'
        },

        {
            imgId: 2,
            imgFilename: 'https://placeimg.com/400/300/tech/grayscale',
            imgTitle: 'Title 2',
            imgAuthor: 'Author 2',
            imgDescription: 'Lorem Ipsum 2',
            imgCreatedAt: '22 22 2222'
        },

        {
            imgId: 3,
            imgFilename: 'https://placeimg.com/400/300/tech/grayscale',
            imgTitle: 'Title 3',
            imgAuthor: 'Author 3',
            imgDescription: 'Lorem Ipsum 3',
            imgCreatedAt: '33 33 3333'
        },

        {
            imgId: 4,
            imgFilename: 'https://placeimg.com/400/300/tech/grayscale',
            imgTitle: 'Title 4',
            imgAuthor: 'Author 4',
            imgDescription: 'Lorem Ipsum 4',
            imgCreatedAt: '44 44 4444'
        },
    ]


} );

var router = new app.Router;

Backbone.history.start();
