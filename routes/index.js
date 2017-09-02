const router = require( 'express' ).Router()

/* GET home page. */
router.get( '/', function ( req, res ) {
    console.log( 'APP: ', '/index.html' );
    res.send( 'index.html' );
} );

module.exports = router;
