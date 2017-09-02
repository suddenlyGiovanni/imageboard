window.spiced = {
    Router: {}
};

( function () {

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

}() );
