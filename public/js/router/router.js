    // BACKBONE ROUTER:_________________________________________________________
    spiced.Router = Backbone.Router.extend( {

        routes: {
            '': 'home',
            'upload': 'upload'
        },
        /*
        route: function ( router, name, fn ) {
            fn = fn || this[ name ];
            var router = this;
            Backbone.Router.prototype.call( this, router, name, function () {
                if ( router.view ) {
                    router.view.undelegateEvents();
                }
                fn.apply( router, arguments );
            } );
        },
        */

        home: function () {
            // $('#main').off();
            // if ( this.view ) {
            //     this.view.undelegateEvents();
            // }
            this.view = new spiced.ImageBoardView( {
                el: '#main',
                // instantiating the ImageBoardModel
                model: new spiced.ImageBoardModel
            } );
        },

        upload: function () {
            // $( '#main' ).off();
            this.view = new spiced.UploadImageView( {
                el: '#main',
                model: new spiced.UploadImageModel
            } );
        }

    } );

    new spiced.Router;

    Backbone.history.start();
