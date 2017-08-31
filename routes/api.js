// /api/
const router = require( 'express' ).Router();
const path = require( 'path' );
const db = require( '../modules/dbQuery' );
// MUTER & UIDSAFE
const multer = require( 'multer' );
const uidSafe = require( 'uid-safe' );
// KNOX
const knox = require( 'knox' );

const fs = require( 'fs' );


//_ MUTER & UIDSAFE_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
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

//_ KNOX_ _ _ _ _ __ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
let secrets;
if ( process.env.NODE_ENV == 'production' ) {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require( '../config/secrets.json' ); // secrets.json is in .gitignore
}

const client = knox.createClient( {
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'spicedimageboard'
} );



//______________________________________________________________________________

// API ENDPOINTS:


// /api/images _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

router.get( '/images', ( req, res ) => {
    db.getImages()
        .then( ( results ) => {
            // console.log( results );
            res.json( {
                images: results
            } );
        } );
} );
//_ _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _


// /api/images/:id _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
router.get( '/images/:imageId', ( req, res ) => {
    console.log( 'hit /images/:imageId' );
    const imageId = req.param( 'imageId' );
    return db.getImageId( imageId )
        .then( ( imageIdData ) => {
            res.json( {
                image: imageIdData
            } );
        } );
} );
//_ _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _



// /api/upload _ _  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
router.post( '/upload', uploader.single( 'image' ), ( req, res ) => {
    console.log( req.file );
    // If nothing went wrong the file is already in the uploads directory
    if ( req.file ) {
        /*
            You can call the put method of the client you've created to create a request
            object using the data in the file object that multer added to the req.
                *   The first argument to put is the name you want the file to have in
                    the bucket
                *   The second argument is an object with additional parameters.
                    The Content-Type and Content-Length parameters are the headers you
                    want S3 to use when it serves the file. The x-amz-acl parameter
                    tells S3 to serve the file to anybody who requests it
                    (the default is for files to be private)
        */
        const s3Request = client.put( req.file.filename, {
            'Content-Type': req.file.size,
            'Content-Length': req.file.size,
            'x-amz-acl': 'public-read'
        } );
        /*  You can now create a read stream out of the file and pipe it to the
            request you've created.
        */
        const readStream = fs.createReadStream( req.file.path );

        readStream.pipe( s3Request );

        s3Request.on( 'response', ( s3Response ) => {

            const wasSuccessful = s3Response.statusCode == 200;

            if ( wasSuccessful ) {
                const title = req.body.title;
                const description = req.body.description;
                console.log(req.body.imgAuthor);
                const imgAuthor = req.body.imgAuthor;
                const fileName = req.file.filename;
                db.postImage( title, description, imgAuthor, fileName )
                    .then( () => {
                        res.json( {
                            success: wasSuccessful
                        } );
                        // remove image from server/uploads
                        fs.unlink( req.file.path, () => {} );
                    } );
            }
        } );
    } else {
        res.json( {
            success: false
        } );
    }
} );
//_ _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _







module.exports = router;
