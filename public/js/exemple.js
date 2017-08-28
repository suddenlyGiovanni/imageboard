( function () {
    // Model
    var UsersModel = Backbone.Model.extend( {
        initialize: function () {
            console.log( this.get( 'users' ) );
            this.fetch();
        },
        deleteUser: function () {
            var users = this.get( 'users' ).filter( function ( user, index ) {
                return index != ind;
            } )
        }
        url: '/users'
    } )



    var usersView = Backbone.View.extend( {
        initialize: function () {
            var view = this;
            this.model.on( 'changes:users', function () {
                // console.log( this.get( 'users' ), this.id );
                view.render();
            } )
        },

        render: function () {
            var html = Handlebar.templates.users( this.model.toJSON() );
            // console.log(html);
            this.$el.html( html );
        },

        handleClick: function ( e ) {
            var index = $( e.target ).index();
            this.model.deleteUser();
        },

        events: {
            'click li': 'handleClick',
            'mouseover li': function () {
                console.log( 'hi' );
            }
        }
    } )

    var userView = new UsersView( {
        el: '#main',
        model: new userModel
    } )


    var Router = Backbone.Router.extend( {
        routes: {
            'users': 'users',
            'user/:id': 'user'
        },
        user: function ( id ) {
            alert( id );
        },
        users: function () {
            alert( 'users!!' )
        }
    } )

    var router = new Router;
    Backbone.history.start();









}() );
