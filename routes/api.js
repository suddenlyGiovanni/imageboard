// /api/
const router = require( 'express' ).Router();
const multer = require( 'multer' );
const uidSafe = require( 'uid-safe' );
const path = require( 'path' );
const db = require( '../modules/dbQuery' );

const diskStorage = multer.diskStorage( {
    // path.resolve;
    destination: ( req, file, callback ) => {
        callback( null, `${path.dirname(__dirname)}/uploads` );
    },

    filename: ( req, file, callback ) => {
        uidSafe( 24 )
            .then( ( uid ) => {
                callback( null, uid + path.extname( file.originalname ) );
            } );
    }

} );

const uploader = multer( {
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
} );



// /api/images
router.get( '/images', ( req, res ) => {
    db.getImages()
        .then( ( results ) => {
            // console.log( results );
            res.json( {
                images: results
            } );
        } );
} );


// /api/images
router.post( '/upload', uploader.single( 'file' ), ( req, res ) => {
    console.log(req.file);
    // If nothing went wrong the file is already in the uploads directory
    if ( req.file ) {
        // uploadToS3(req.file).then(()=>{
    //  dbquery save
    //})
        res.json( {
            success: true
        } );
    } else {
        res.json( {
            success: false
        } );
    }
} );







module.exports = router;
