// public/js/views/imageBoard.js

var app = app || {};

// Define a IMAGESBOARD View
app.ImageBoardView = Backbone.View.extend( {
    el: '#ImageBoard',

    // Called when the view is first created
    initialize: function ( initialImages ) {
        console.log( 'VIEW: ', 'ImageBoardView - has been initialized' );
        this.collection = new app.Portfolio( initialImages );
        this.render();
    },

    // render Portfolio by rendering each image in its collection
    render: function () {
        this.collection.each( function ( item ) {
            this.renderImage( item );
        }, this );
    },

    // render a image by creating a ImageView and appending the
    // element it renders to the Portfolio's element
    renderImage: function ( item ) {
        // Instantiate the imageView with Image Model
        var imageView = new app.ImageView( {
            model: item
        } );
        this.$el.append( imageView.render().el );
    }


} );
