// public/js/views/PortfolioView.js

var app = app || {};

// Define a IMAGESBOARD View
app.PortfolioView = Backbone.View.extend( {
    el: '#imageBoard',
    collection: app.PortfolioCollection,


    // Called when the view is first created
    initialize: function ( initialImages ) {
        console.log( 'VIEW: ', 'PortfolioView - has been initialized' );
        // save this as a reference to view obj;
        // var view = this;

        this.collection = new app.PortfolioCollection( initialImages );
        console.log( 'VIEW: ', 'PortfolioView - PortfolioCollection: ', this.collection );
        this.render();

        // this.collection.on( 'change', function () {
        //     console.log( 'PortfolioCollection - CHANGE EVENT:', view );
        //     view.render();
        //     return view;
        // } );
    },

    // render PortfolioCollection by rendering each image in its collection
    render: function () {
        this.collection.each( function ( item ) {
            this.renderImage( item );
        }, this );
    },

    // render a image by creating a ImageView and appending the
    // element it renders to the PortfolioCollection's element
    renderImage: function ( item ) {
        // Instantiate the imageView with Image Model
        var imageView = new app.ImageView( {
            model: item
        } );
        this.$el.append( imageView.render().el );
    },

    events: {
        'click a#btnModal': 'openUpload',
        'click #add': 'uploadImage'
    },

    openUpload: function () {
        console.log('openUpload fired');
    },

    uploadImage: function() {
        console.log('fn: uploadImage - FIRED');
    }

} );
