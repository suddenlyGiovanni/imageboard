// public/js/models/appModel.js

var app = app || {};

// Define a APP Model

app.AppModel = Backbone.Model.extend({

    // Called when the model is first created
    initialize: function () {
        console.log( 'MODEL: ', 'AppModel - has been initialized' );
    }
    
});
