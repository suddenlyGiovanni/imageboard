const router = require( 'express' ).Router()
const db = require( '../modules/dbQuery' );

/* GET home page. */
router.get( '/', function ( req, res ) {
    // res.render( 'index', {
    //     title: 'Express'
    // } );
    res.send( index.html );
} );


router.get( '/images', ( req, res ) => {
    db.getImages()
        .then( ( results ) => {
            // console.log( results );
            res.json({
                images : results
            });
        } );
} );

module.exports = router;
