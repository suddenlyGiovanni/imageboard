const router = require( 'express' ).Router()

/* GET home page. */
router.get( '/', function ( req, res ) {
    res.send( index.html );
} );

module.exports = router;
