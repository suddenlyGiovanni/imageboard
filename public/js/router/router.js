    // BACKBONE ROUTER:_________________________________________________________
    spiced.Router = Backbone.Router.extend( {

        routes: {
            '': 'home',
            'upload': 'upload'
        },

        home: function () {

            this.view = new spiced.ImagesView( {
                el: '#main',
                // instantiating the ImageBoardModel
                // model: new spiced.ImageModel
                model: new spiced.ImagesModel
            } );
        },

        upload: function () {
            this.view = new spiced.UploadImageView( {
                el: '#main',
                model: new spiced.UploadImageModel
            } );
        }

    } );

    new spiced.Router;

    Backbone.history.start();
