// IMAGES MODEL_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
spiced.ImagesModel = Backbone.Model.extend( {

    initialize: function () {

        console.log( 'MODEL: ', 'ImagesModel - has been initialized' );

        this.fetch( {

            success: function () {
                console.log( 'fetch data from /api/images - SUCCESFULY' );
            },

            error: function () {
                console.log( 'fetch data from /api/images - ERROR' );
            }
        } );

        console.log( 'MODEL: ', 'ImagesModel: ', this );
    },

    url: '/api/images'

} );
//_ _ _ _ _ _ __ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
