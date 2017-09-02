spiced.ImageView = Backbone.View.extend( {

    initialize: function () {
        console.log( 'VIEW: ', 'ImageView - has been initialized' );
        // console.log( this.model );
        // save this as a reference to view obj;
        var view = this;

        this.model.on( 'change', function () {
            console.log('ImageView - CHANGE EVENT:', this);
            view.render();
        } );

        // view.listenTo(this.model, 'sync', view.render)
    },

    render: function () {
        // make a shallow copy of the data so that any changes do not reflect to the model
        var data = this.model.toJSON();
        console.log( data );
        // this.$('#imagesView').empty();
        var html = Handlebars.templates.imageView( data );
        // console.log(data);
        this.$el.html( html );
    },

    events: {
        'click button': function ( e ) {
            e.preventDefault();
            console.log( 'button was clicked' );
            const image = this.model.get( 'image' );
            // console.log(image);

            const postComment = {
                imageId: image.imageId,
                commAuthor: this.$el.find( 'input[name="commAuthor"]' ).val(),
                comment: this.$el.find( 'textarea[name="comment"]' ).val()
            };

            this.model.set( postComment );
            this.model.save();
        }
    }
} );
