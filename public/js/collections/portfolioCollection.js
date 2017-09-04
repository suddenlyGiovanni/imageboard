// public/js/collections/portfolioCollection.js

var app = app || {};

// Define a IMAGES Collection
app.PortfolioCollection = Backbone.Collection.extend( {

    model: app.ImageModel,
    url: '/api/images',

    /*
        url             HTTP Method  Operation
        /api/images      GET          Get an array of all images
        /api/images/:id  GET          Get the image with id of :id
        /api/images      POST         Add a new image and return the image with an id attribute added
        /api/images/:id  PUT          Update the image with id of :id
        /api/images/:id  DELETE       Delete the image with id of :id
    */

    // Called when the Collection is first created
    initialize: function () {
        console.log( 'COLLECTION: ', 'PortfolioCollection - has been initialized' );

        this.fetch( {

            success: function () {
                console.log( 'COLLECTION: ', 'PortfolioCollection - fetch data from /api/images - SUCCESFULY' );
            },

            error: function () {
                console.log( 'COLLECTION: ', 'PortfolioCollection - fetch data from /api/images - ERROR' );
            }
        } );


    }

} );
