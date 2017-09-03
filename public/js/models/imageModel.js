// public/js/models/imageModel.js

var app = app || {};

// Define a IMAGE Model
app.ImageModel = Backbone.Model.extend( {

    // idAttribute is the identifying attribute name of the model returned from the server
    idAttribute: 'imgId',

    // Called when the model is first created
    initialize: function () {
        console.log( 'MODEL: ', 'ImageModel - has been initialized' );
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
