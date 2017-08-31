// IMAGE VIEW_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
spiced.ImageBoardView = Backbone.View.extend( {

    initialize: function () {
        // save this as a reference to view obj;
        var view = this;

        this.model.on( 'change', function () {
            view.render();
        } );
    },

    render: function () {
        // make a shallow copy of the data so that any changes do not reflect to the model
        var data = this.model.toJSON();

        var html = Handlebars.templates.imageBoard( data );
        // console.log(data);
        this.$el.html( html );

    }
} );
