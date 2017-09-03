// public/js/views/imageView.js

var app = app || {};

// Define a IMAGE View
app.ImageView = Backbone.View.extend( {


    // Called when the view is first created
    initialize: function () {
        console.log( 'VIEW: ', 'ImageView - has been initialized' );
    },


    tagName: 'div',
    className: 'imageContainer',
    // Cache the template function for a single item.
    // template: Handlebars.templates.imageTemplate.html(),
    template: Handlebars.compile( $( '#imageTemplate' ).html() ),


    render: function () {
        // make a shallow copy of the data so that any changes do not reflect to the model
        var data = this.model.toJSON();
        console.log( 'VIEW: ImageView - ', 'Fn: render( ImageModel data: )', data );
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        // this.$el.html( this.template( this.model.attributes ) );
        this.$el.html( this.template( data ) );

        return this;
    }

} );
