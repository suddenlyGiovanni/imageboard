// public/js/models/uploadModel.js

var app = app || {};

// Define a UPLOAD Model

app.UploadModel = Backbone.Model.extend({

    url: '/api/upload',

    // Called when the model is first created
    initialize: function () {
        console.log( 'MODEL: ', 'UploadModel - has been initialized' );
    },

    save: function () {

        var formData = new FormData;

        formData.append( 'image', this.get( 'image' ) );
        formData.append( 'title', this.get( 'title' ) );
        formData.append( 'description', this.get( 'description' ) );
        formData.append( 'imgAuthor', this.get( 'imgAuthor' ) );

        var model = this;

        $.ajax( {
            url: this.url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false, // not set a contentType at all
            success: function () {
                model.trigger( 'uploadSuccess' );
                // router.navigate( '/#/', {
                //     trigger: true
                // } );
            }
        } );
    }

});
