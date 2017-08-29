var Router = Backbone.Router.extend( {
    routes: {
        'image/:id': 'image',
        'upload': 'upload',
        '*': 'home'
    },
    home: function () {},
    image: function ( id ) {},
    upload: function () {
        new UploadView( {
            el: '#main',
            model: new UploadModel
        } );
    }
} );

var UploadModel = Backbone.Model.extend( {

    url: '/upload',

    save: function () {
        var formData = new FormData;

        formData.append( 'file', this.get( 'file' ) );
        formData.append( 'title', this.get( 'title' ) );

        var model = this;
        $.ajax( {
            url: this.url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                model.trigger( 'uploadSuccess' );
            }
        } );
    }
} );

var UploadView = Backbone.View.extend( {
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html( Handlebars.templates.upload( {} ) )
    },
    events: {
        'click button': function ( e ) {
            this.model.set( {
                title: this.$el.find( 'input[name="title"]' ).val(),
                file: this.$el.find( 'input[type="file"]' ).get(0).files[ 0 ]
            } ).save();
        }
    }
} );
