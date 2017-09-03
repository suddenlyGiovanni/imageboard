// public/js/views/uploadView.js

var app = app || {};

// Define a UPLOAD IMAGE View
app.UploadView = Backbone.View.extend( {
    el: '#modalContainer',
    model: app.UploadModel,

    tagName: 'form',
    className: 'col s12 formUpload',
    // Cache the template function for a single item.
    // template: Handlebars.templates.uploadTemplates.html(),
    template: Handlebars.compile( $( '#uploadTemplates' ).html() ),

    // Called when the view is first created
    initialize: function () {
        console.log( 'VIEW: ', 'UploadView - has been initialized' );
        this.model = new app.UploadModel;

        // this.listenTo(Backbone, 'uploadImageView:open', this.modalOpen)

        console.log( 'VIEW: ', 'UploadView - UploadModel: ', this.model );
        this.render();

    },

    render: function () {
        // make a shallow copy of the data so that any changes do not reflect to the model
        var data = this.model.toJSON();
        console.log( data );
        // this.el is what we defined in tagName. use $el to get access to jQuery html() function
        // this.$el.html( this.template( this.model.attributes ) );§
        this.$el.html( this.template( data ) );

        // $('#modalContainer').modal('open');

        // this.modalOpen();

        return this;
    },


    modalOpen: function () {
        // var modal = $('.modal').modal();
        // modal.modal('open');
        console.log('fn: modalOpen - FIRED');
    }

} );
