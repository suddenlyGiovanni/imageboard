// IMAGESVIEW _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
spiced.ImagesView = Backbone.View.extend( {

    initialize: function () {
        console.log( this.collection );
        // save this as a reference to view obj;
        var view = this;

        this.model.on( 'change', function () {
            view.render();
        } );
    },

    render: function () {
        // make a shallow copy of the data so that any changes do not reflect to the model
        var data = this.model.toJSON();

        var html = Handlebars.templates.imagesView( data );
        // console.log(data);
        this.$el.html( html );
    }
} );
