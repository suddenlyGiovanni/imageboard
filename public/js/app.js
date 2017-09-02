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

    $( document ).ready( function () {
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        $( '.modal' ).modal();
    } );

    var images = [

        {
            imgId: 0,
            fileName: 'https://placeimg.com/400/300/tech/grayscale',
            title: 'Title 0',
            imgAuthor: 'Author 0',
            description: 'Lorem Ipsum 0',
            createdAt: '00 00 0000'
        },

        {
            imgId: 1,
            fileName: 'https://placeimg.com/400/300/tech/grayscale',
            title: 'Title 1',
            imgAuthor: 'Author 1',
            description: 'Lorem Ipsum 1',
            createdAt: '11 11 1111'
        },

        {
            imgId: 2,
            fileName: 'https://placeimg.com/400/300/tech/grayscale',
            title: 'Title 2',
            imgAuthor: 'Author 2',
            description: 'Lorem Ipsum 2',
            createdAt: '22 22 2222'
        },

        {
            imgId: 3,
            fileName: 'https://placeimg.com/400/300/tech/grayscale',
            title: 'Title 3',
            imgAuthor: 'Author 3',
            description: 'Lorem Ipsum 3',
            createdAt: '33 33 3333'
        },

        {
            imgId: 4,
            fileName: 'https://placeimg.com/400/300/tech/grayscale',
            title: 'Title 4',
            imgAuthor: 'Author 4',
            description: 'Lorem Ipsum 4',
            createdAt: '44 44 4444'
        },
    ];

    new app.ImageBoardView( images );

} );
