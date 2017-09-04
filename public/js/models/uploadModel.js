// public/js/models/uploadModel.js

var app = app || {};

// Define a UPLOAD Model
// TODO: SWITCH TO USING THE IMAGES COLLECTION INSTEAD

app.UploadModel = Backbone.Model.extend( {

    url: '/api/images',

    // Called when the model is first created
    initialize: function () {
        console.log( 'MODEL: ', 'UploadModel - has been initialized' );
    },

    save: function () {

        console.log( 'fn: save' );

        var formData = new FormData();

        var imgFilename = this.get( 'imgFilename' );
        var imgTitle = this.get( 'imgTitle' );
        var imgDescription = this.get( 'imgDescription' );
        var imgAuthor = this.get( 'imgAuthor' );

        console.log( 'fn: save - imgFilename: ', imgFilename );
        console.log( 'fn: save - imgTitle: ', imgTitle );
        console.log( 'fn: save - imgDescription: ', imgDescription );
        console.log( 'fn: save - imgAuthor: ', imgAuthor );

        formData.append( 'imgFilename', imgFilename );
        formData.append( 'imgTitle', imgTitle );
        formData.append( 'imgDescription', imgDescription );
        formData.append( 'imgAuthor', imgAuthor );

        console.log('formData: ', formData);

        var model = this;

        console.log('log this.model: ', model);

        $.ajax( {
            url: this.url,
            method: 'POST',
            // data: model,
            data: formData,
            processData: false,
            contentType: false, // not set a contentType at all
            success: function () {
                model.trigger( 'uploadSuccess' );
            }
        } );
    }

} );
