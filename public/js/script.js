( function () {

    // HANDLEBARS INITIALIZATION
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll( 'template' );

    Array.prototype.slice.call( templates ).forEach( function ( tmpl ) {
        Handlebars.templates[ tmpl.id ] = Handlebars.compile( tmpl.innerHTML.replace( /{{&gt;/g, '{{>' ) );
    } );

    Handlebars.partials = Handlebars.templates;
    // _________________________________________________________________________



    // BACKBONE MODEL:

    // HOME
    var HomeModel = Backbone.Model.extend( {
        initialize: function () {
            this.fetch();
        },

        url: function () {
            return '/images';
        }

    } );
    // _________________________________________________________________________



    // BACKBONE VIEWS:
    var HomeView = Backbone.View.extend( {

        initialize: function () {
            // save this as a reference to view obj;
            var view = this;

            this.model.on( 'change', function () {
                view.render();
            } );
        },

        render: function () {
            var data = this.model.toJSON();

            var html = Handlebars.templates.imageBoard( data );
            // console.log(data);
            this.$el.html( html );

        }


    } );


    // BACKBONE ROUTER
    var Router = Backbone.Router.extend( {

        routes: {
            'home': 'home'
        },
        home: function () {
            var homeView = new HomeView( {
                el: '#main',
                model: new HomeModel
            } );
        }
    } );

    var router = new Router;

    Backbone.history.start();

}() );
