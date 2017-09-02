// IMAGE MODEL _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

spiced.ImageModel = Backbone.Model.extend( {

    initialize: function () {
        console.log('MODEL: ', 'ImageModel - has been initialized' );

        this.fetch( {

            success: function () {
                console.log( `fetch data from /api/images/:${this.imgId} - SUCCESFULY`);
            },

            error: function () {
                console.log( `fetch data from /api/images/:${this.imgId} - ERROR` );
            }
        } );

        console.log('MODEL: ', 'ImageModel: ', this );
    },

    url: function () {
        // console.log( this.get('imgId') );
        return '/api/images/' + this.get( 'imgId' );
    }

} );
