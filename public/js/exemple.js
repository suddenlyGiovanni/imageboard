( function () {
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll( 'template' );

    Array.prototype.slice.call( templates ).forEach( function ( tmpl ) {
        Handlebars.templates[ tmpl.id ] = Handlebars.compile( tmpl.innerHTML.replace( /{{&gt;/g, '{{>' ) );
    } );

    Handlebars.partials = Handlebars.templates;

    var UsersModel = Backbone.Model.extend( {
        initialize: function () {
            console.log( this.get( 'users' ), this.id )
            this.fetch();
        },
        addUser: function ( user ) {
            this.get( 'users' ).push( user );
            this.trigger( 'change:users' );
        },
        deleteUser: function ( idx ) {
            var users = this.get( 'users' ).filter( function ( user, index ) {
                return index != idx;
            } );
            this.set( {
                users: users
            } )
        },
        url: function () {
            return '/users'
        }
    } );


    var UsersView = Backbone.View.extend( {
        initialize: function () {
            var view = this;
            this.model.on( 'change', function () {
                view.render();
            } );
        },
        render: function () {
            var data = this.model.toJSON();

            data.title = 'Here are the users:';

            var html = Handlebars.templates.users( data );

            this.$el.html( html );
        },
        handleClick: function ( e ) {
            var index = $( e.target ).index();
            this.model.deleteUser( index );
        },
        events: {
            'click li': 'handleClick',
            'mouseover li': function () {
                console.log( 'hi!' );
            }
        }
    } );

    var Router = Backbone.Router.extend( {
        routes: {
            'user/:id': 'user',
            'users': 'users'
        },
        user: function ( id ) {
            alert( id );
        },
        users: function () {
            var usersView = new UsersView( {
                el: '#main',
                model: new UsersModel
            } );
        }
    } );

    var router = new Router;

    Backbone.history.start();

} )();
