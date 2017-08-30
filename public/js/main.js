( function () {

    // HANDLEBARS INITIALIZATION
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll( 'template' );

    Array.prototype.slice.call( templates ).forEach( function ( tmpl ) {
        Handlebars.templates[ tmpl.id ] = Handlebars.compile( tmpl.innerHTML.replace( /{{&gt;/g, '{{>' ) );
    } );

    Handlebars.partials = Handlebars.templates;
    // _________________________________________________________________________



    // BACKBONE MODELS:_________________________________________________________

    // HOME MODEL_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    var ImageBoardModel = Backbone.Model.extend( {

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


    //  UPLOAD IMAGE MODEL_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    var UploadImageModel = Backbone.Model.extend( {

        url: '/api/upload',

        save: function () {

            var formData = new FormData;

            formData.append( 'image', this.get( 'image' ) );
            formData.append( 'title', this.get( 'title' ) );
            formData.append( 'description', this.get( 'description' ) );
            formData.append( 'username', this.get( 'username' ) );

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



    // BACKBONE VIEWS:__________________________________________________________

    // IMAGE VIEW_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    var ImageBoardView = Backbone.View.extend( {

        initialize: function () {
            // save this as a reference to view obj;
            var view = this;

            this.model.on( 'change', function () {
                view.render();
            } );
        },

        render: function () {
            // make a shallow copy of the data so that any changes do not reflect to the model
            var data = this.model.toJSON();

            var html = Handlebars.templates.imageBoard( data );
            // console.log(data);
            this.$el.html( html );

        }
    } );

    // UPLOAD IMAGE VIEW _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    var UploadImageView = Backbone.View.extend( {

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html( Handlebars.templates.upload( {} ) )
        },

        events: {
            'click button': function ( e ) {
                e.preventDefault();
                this.model.set( {
                    title: this.$el.find( 'input[name="title"]' ).val(),
                    image: this.$el.find( 'input[name="image"]' ).prop( 'files' )[ 0 ],
                    description: this.$el.find( 'textarea[name="description"]' ).val(),
                    username: this.$el.find( 'input[name="username"]' ).val()
                } ).save();
            }
        }
    } );


    // _________________________________________________________________________

    // MONKEY PATHCING
    var oldSetElement = Backbone.View.prototype.setElement;
    Backbone.View.prototype.setElement = function ( el ) {
        if ( el == '#main' ) {
            $( el ).off();
        }
        // this is referring to the view obj
        oldSetElement.call( this, el );
    }


    // BACKBONE ROUTER:_________________________________________________________
    var Router = Backbone.Router.extend( {

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
            this.view = new ImageBoardView( {
                el: '#main',
                // instantiating the ImageBoardModel
                model: new ImageBoardModel
            } );
        },

        upload: function () {
            // $( '#main' ).off();
            this.view = new UploadImageView( {
                el: '#main',
                model: new UploadImageModel
            } );
        }

    } );

    var router = new Router;

    Backbone.history.start();
    // _________________________________________________________________________


}() );
