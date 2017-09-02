// public/js/models/image.js

var app = app || {};

// Define a IMAGE Model
app.Image = Backbone.Model.extend( {


    // Called when the model is first created
    initialize: function () {
        console.log( 'MODEL: ', 'Image - has been initialized' );
    },


    // Default image attribute values
    defaults: {
        imgId: 0,
        fileName: 'https://placeimg.com/400/300/tech/grayscale',
        imgAuthor: 'Unknown',
        title: 'No title',
        description: 'No description',
        createdAt: 'No date'
    },

} );
