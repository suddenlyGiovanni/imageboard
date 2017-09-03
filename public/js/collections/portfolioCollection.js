// public/js/collections/portfolioCollection.js

var app = app || {};

// Define a IMAGES Collection
app.PortfolioCollection = Backbone.Collection.extend( {

    model: app.ImageModel,

    // Called when the model is first created
    initialize: function() {
        console.log('COLLECTION: ', 'PortfolioCollection - has been initialized' );
    }

} );
