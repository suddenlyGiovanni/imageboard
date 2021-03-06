const express = require( 'express' );
const path = require( 'path' );
// const favicon = require( 'serve-favicon' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );

const index = require( './routes/index' );
const api = require( './routes/api' );


// EXPRESS
const app = express();


// BODY PARSER
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: false
} ) );
app.use( cookieParser() );


// STATIC ASSETS
// serve to the client (if it requires it) the content of the public folder.
// to the client this will be the root of the app.
app.use( express.static( path.join( __dirname, 'public' ) ) );



// ROUTING _____________________________________________________________________
//  Connect all our routes to our application
app.use( '/', index );
app.use( '/api', api );

// ERROR:
// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );

// error handler
app.use( function ( err, req, res, next ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // render the error page
    res.status( err.status || 500 );
    // res.render( 'error' );
} );

module.exports = app;
