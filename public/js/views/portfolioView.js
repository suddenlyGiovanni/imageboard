// public/js/views/PortfolioView.js

var app = app || {};

// Define a IMAGESBOARD View
app.PortfolioView = Backbone.View.extend( {

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    el: '#imageBoard',
    collection: app.PortfolioCollection,
    events: {
        'click a#btnModal': 'openUpload',
        'click #add': 'uploadImage'
    },
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _


    // INITIALIZE: _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Called when the view is first created
    initialize: function ( initialImages ) {
        console.log( 'VIEW: ', 'PortfolioView - has been initialized' );
        // save this as a reference to view obj;
        var view = this;

        this.collection = new app.PortfolioCollection( initialImages );
        console.log( 'VIEW: ', 'PortfolioView - PortfolioCollection: ', this.collection );
        this.render();

        // EVENT listeners:

        this.listenTo( this.collection, 'add', this.renderImage ),

        this.collection.on( 'change', function () {
            console.log('this.collection: ', this.collection);
            console.log( 'PortfolioCollection - CHANGE EVENT:', view );
            view.render();
            return view;
        } );

    },
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _


    // RENDER _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // render PortfolioCollection by rendering each image in its collection
    render: function () {
        console.log('VIEW: ', 'PortfolioView - fn: render()');
        this.collection.each( function ( item ) {
            this.renderImage( item );
        }, this );
    },

    // RENDER A IMAGE by creating a ImageView and appending the
    // element it renders to the PortfolioCollection's element
    renderImage: function ( item ) {
        console.log('VIEW: ', 'PortfolioView - fn: renderImage() - ',  item);
        // Instantiate the imageView with Image Model
        var imageView = new app.ImageView( {
            model: item
        } );
        this.$el.append( imageView.render().el );
    },
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _


    // FUNCTIONS _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    openUpload: function () {
        console.log( 'openUpload fired' );
    },

    uploadImage: function () {
        console.log( 'fn: uploadImage - FIRED' );
    }

} );
