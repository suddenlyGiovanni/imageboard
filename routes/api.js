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
/*  API ENDPOINTS:
    url             HTTP Method  Operation
    /api/images         GET          Get an array of all images
    /api/images/:imgId  GET          Get the image with Id of :imgId
    /api/images         POST         Add a new image and return the image with an imgId attribute added
    /api/images/:imgId  PUT          Update the image with Id of :imgId
    /api/images/:imgId  DELETE       Delete the image with Id of :imgId
*/ // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

// GET ALL IMAGES:
// /api/images _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
router.get( '/images', ( req, res ) => {

    console.log( 'API: ', '/api/images' );

    return db.getImages()
        .then( ( results ) => {
            // console.log( results );
            res.json( {
                images: results
            } );
        } );
} );
//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _


// GET IMAGE WITH ID
// /api/images/:id _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
router.get( '/images/:imgId', ( req, res ) => {

    const imgId = req.param( 'imgId' );
    console.log( 'API GET: ', `/api/images/:${imgId}` );

    return db.getImageId( imgId )
        .then( ( imgIdData ) => {
            res.json( {
                image: imgIdData
            } );
        } );
} );
//_ _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _


// POST A IMAGE
// /api/images _ _  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
router.post( '/images', uploader.single( 'imgFilename' ), ( req, res ) => {
    console.log( 'API: ', '/api/images' );
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

                const imgTitle = req.body.imgTitle;
                const imgDescription = req.body.imgDescription;
                const imgAuthor = req.body.imgAuthor;
                const imgFilename = req.file.filename;

                return db.postImage( imgFilename, imgAuthor, imgTitle, imgDescription )

                    .then( ( imgIdData ) => {
                        res.json( {
                            success: wasSuccessful, // will convert to true
                            image: imgIdData
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







// POST A COMMENT ON IMAGE WITH ID:
// /api/images/:id _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
router.post( '/images/:imgId', ( req, res ) => {
    const imgId = req.param( 'imgId' );
    const comAuthor = req.body.comAuthor;
    const comText = req.body.comText;
    console.log( 'API POST: ', `/api/images/:${imgId}` );

    return db.postComment( imgId, comAuthor, comText )
        .then( ( success ) => {
            if ( success ) {
                res.json( {
                    success
                } );
            }
        } );
} );









module.exports = router;
