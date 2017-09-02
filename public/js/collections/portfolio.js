// public/js/collections/Portfolio.js

var app = app || {};

// Define a IMAGES Collection
app.Portfolio = Backbone.Collection.extend( {

    // Called when the model is first created
    initialize: function() {
        console.log('COLLECTION: ', 'Portfolio - has been initialized' );
    },

    model: app.Image,

} );
