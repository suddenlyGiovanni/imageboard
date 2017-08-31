
    // HOME MODEL_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    spiced.ImageBoardModel = Backbone.Model.extend( {

        initialize: function () {

            console.log( 'ImageBoardModel has been initialize' );

            this.fetch( {

                success: function () {
                    console.log( 'fetch data from /api/images - SUCCESFULY' );
                },

                error: function () {
                    console.log( 'fetch data from /api/images - ERROR' );
                }
            } );
        },

        url: '/api/images'

    } );
    //_ _ _ _ _ _ __ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
