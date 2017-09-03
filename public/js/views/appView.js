// public/js/views/appView.js

var app = app || {};

// Define a APP View

app.AppView = Backbone.View.extend({

    el: '#appViewContainer',
    model: app.AppModel,

    // Called when the view is first created
    initialize: function () {
        console.log( 'VIEW: ', 'AppView - has been initialized' );
        this.model = new app.AppModel();
        this.render();
    },

    // Cache the template function for a single item.
    template: Handlebars.compile( $( '#appTemplate' ).html() ),

    render: function () {
        // make a shallow copy of the data so that any changes do not reflect to the model
        var data = this.model.toJSON();
        console.log(data);
        // this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template(data));

        return this;
    },

    events: {
        'click #btnModal' : 'openUploadModal'
    },

    openUploadModal: function () {
        console.log('fn: openUploadModal FIRED');
        // $('#modalContainer').modal('open');
        
    }

});
