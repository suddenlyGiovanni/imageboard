// UPLOAD IMAGE VIEW _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
spiced.UploadImageView = Backbone.View.extend( {

    initialize: function () {
        console.log( 'VIEW: ', 'UploadImageView - has been initialized' );
        this.listenTo(this.model, 'uploadSuccess', this.clearUploadView);
        this.render();
    },

    render: function () {
        this.$el.html( Handlebars.templates.imageUploadView( {} ) )
    },

    events: {
        'click button': function ( e ) {
            e.preventDefault();
            this.model.set( {
                title: this.$el.find( 'input[name="title"]' ).val(),
                image: this.$el.find( 'input[name="image"]' ).prop( 'files' )[ 0 ],
                description: this.$el.find( 'textarea[name="description"]' ).val(),
                imgAuthor: this.$el.find( 'input[name="imgAuthor"]' ).val()
            } ).save();
        }
    },

    clearUploadView: function() {
        router.navigate( '/#/', {
            trigger: true
        } );
    }

} );
