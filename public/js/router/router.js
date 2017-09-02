    // BACKBONE ROUTER:_________________________________________________________
    spiced.Router = Backbone.Router.extend( {

        routes: {
            '': 'home',
            'upload': 'uploadView',
            'images/:imgId': 'imageView'
        },

        home: function () {
            this.view = new spiced.ImagesView( {
                el: '#main',
                model: new spiced.ImagesModel
            } );
        },

        uploadView: function () {
            this.view = new spiced.UploadImageView( {
                el: '#main',
                model: new spiced.UploadImageModel
            } );
        },

        imageView: function ( imgId ) {
            console.log( 'ROUTER: ', 'fn: imageView', `imgId: ${imgId}` );
            this.view = new spiced.ImageView( {
                el: '#main',
                model: new spiced.ImageModel( {
                    imgId: imgId
                } )
            } );
        }

    } );

    var router = new spiced.Router;

    Backbone.history.start();
