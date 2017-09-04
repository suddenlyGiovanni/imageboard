// public/js/views/uploadView.js

var app = app || {};

// Define a UPLOAD IMAGE View
app.UploadView = Backbone.View.extend( {
    el: '#modalContainer',
    model: app.UploadModel,
    // collection: app.PortfolioCollection,

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
        this.listenTo(this.model, 'uploadSuccess', this.clearUploadView);
        this.render();

    },

    render: function () {
        // make a shallow copy of the data so that any changes do not reflect to the model
        var data = this.model.toJSON();
        // console.log( data );
        // this.el is what we defined in tagName. use $el to get access to jQuery html() function
        // this.$el.html( this.template( this.model.attributes ) );§
        this.$el.html( this.template( data ) );

        // $('#modalContainer').modal('open');

        // this.modalOpen();

        return this;
    },

    events: {
        'onchange #fileUpload': 'imgPreview',
        'click button#add': 'postForm'
    },


    // BUG: not even getting here.. resource for this at:
    // https://stackoverflow.com/questions/14069421/show-an-image-preview-before-upload
    imgPreview: function () {
        console.log( 'fn: imgPreview - FIRED' );
        var reader = new FileReader();

        reader.onload = function ( e ) {
            // get loaded data and render thumbnail.
            $( '#image' ).src = e.target.result;
        };

        // read the image file as a data URL.
        reader.readAsDataURL( this.file[ 0 ] );
    },

    postForm: function ( e ) {
        console.log( 'fn: postForm - FIRED' );
        e.preventDefault();

        // log the file'property
        // console.log(this.$el.find( 'input[name="imgFilename"]' ).prop( 'files' )[ 0 ]);
        // var formData = {
        //     imgTitle: this.$el.find( 'input[name="imgTitle"]' ).val(),
        //     // imgFilename: this.$el.find( 'input[name="imgFilename"]' ).prop( 'files' )[ 0 ],
        //     imgDescription: this.$el.find( 'textarea[name="imgDescription"]' ).val(),
        //     imgAuthor: this.$el.find( 'input[name="imgAuthor"]' ).val()
        // };



        this.model.set({
            imgTitle: this.$el.find( 'input[name="imgTitle"]' ).val(),
            imgFilename: this.$el.find( 'input[name="imgFilename"]' ).prop( 'files' )[ 0 ],
            imgDescription: this.$el.find( 'textarea[name="imgDescription"]' ).val(),
            imgAuthor: this.$el.find( 'input[name="imgAuthor"]' ).val()
        }).save();
        // console.log('formData: ', formData);
        // console.log("this.collection: ", this.collection);
        // this.collection.add(new app.ImageModel(formData));

    },

    clearUploadView: function() {
        console.log('fn: clearUploadView - FIRED');
        $('.modal').modal('close');
    },


    modalOpen: function () {
        // var modal = $('.modal').modal();
        // modal.modal('open');
        console.log( 'fn: modalOpen - FIRED' );
    }

} );
