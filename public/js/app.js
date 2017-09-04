// public/js/app.js

var app = app || {};

$( function () {

    // HANDLEBARS INITIALIZATION
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll( 'template' );

    Array.prototype.slice.call( templates ).forEach( function ( tmpl ) {
        Handlebars.templates[ tmpl.id ] = Handlebars.compile( tmpl.innerHTML.replace( /{{&gt;/g, '{{>' ) );
    } );

    Handlebars.partials = Handlebars.templates;
    // _________________________________________________________________________

    // MONKEY PATHCING
    var oldSetElement = Backbone.View.prototype.setElement;
    Backbone.View.prototype.setElement = function ( el ) {
        if ( el == '#main' ) {
            $( el ).off();
        }
        // this is referring to the view obj
        oldSetElement.call( this, el );
    }
    // _________________________________________________________________________
    // Backbone.trigger('event'); // logs: Handled Backbone event
    Backbone.on( 'uploadImageView:open', function () {
        console.log( 'uploadImageView:open' );
        this.view = new app.UploadView();
    } );


    // MATERIALIZE elements Initialization:

    // MODAL WINDOWS
    // jQuery Plugin Initialization
    // To open a modal using a trigger:
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    // $( '.modal' ).modal();

    // new app.AppView(app.AppModel);

    // new app.PortfolioView( images );

} );
