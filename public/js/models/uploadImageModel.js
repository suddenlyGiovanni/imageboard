//  UPLOAD IMAGE MODEL_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
spiced.UploadImageModel = Backbone.Model.extend( {

    url: '/api/upload',

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
            }
        } );
    }
} );
// _________________________________________________________________________
