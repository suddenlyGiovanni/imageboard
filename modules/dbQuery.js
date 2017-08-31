// dbQuery.js

// REQUIRED MODULES_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const spicedPg = require( 'spiced-pg' );
const db = spicedPg( process.env.DATABASE_URL || require( '../config/secrets.json' ).psqlConfig );
const s3Url = require( '../config/config.json' ).s3Url;


// GET ALL images
const getImages = () => {

    console.log( 'fn: "getImages"' );

    const query = `SELECT   id AS "imgId",
                            file_name AS "fileName",
                            img_author AS "imgAuthor",
                            title,
                            description,
                            created_at AS "createdAt"
                    FROM images`;

    return db.query( query )

        .then( ( results ) => {
            // console.log( results );
            return results.rows.map( ( currentObj ) => {
                currentObj.fileName = s3Url + currentObj.fileName;
                currentObj.createdAt = currentObj.createdAt.toDateString();
                return currentObj;
            } );
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};

// GET a specific image _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const getImageId = ( imageId ) => {

    console.log( 'fn: "getImageId"' );

    const query = `SELECT   images.id AS "imageId",
                    		images.file_name AS "fileName",
                    		images.img_author AS "imgAuthor",
                    		images.title,
                    		images.description,
                    		comments.id AS "commentId",
                    		comments.comm_author AS "commAuthor",
                    		comments.comment,
                    		comments.created_at AS "createdAt"
                    FROM images
                    LEFT JOIN comments
                    ON images.id = comments.image_id
                    WHERE images.id = $1
                    ORDER BY comments.created_at DESC NULLS LAST;`;

    return db.query( query, [ imageId ] )

        .then( ( results ) => {

            const imageIdData = results.rows;

            // console.log( imageIdData );

            const newImageData = {
                imageId : imageIdData[ 0 ].imageId,
                fileName : s3Url + imageIdData[ 0 ].fileName,
                imgAuthor : imageIdData[ 0 ].imgAuthor,
                title : imageIdData[ 0 ].title,
                description : imageIdData[ 0 ].description,
                comments: imageIdData.filter( function ( comment ) {
                    return comment.commentId;
                } ).map( function ( comment ) {
                    return {
                        commentId: comment.commentId,
                        commAuthor: comment.commAuthor,
                        comment: comment.comment,
                        createdAt: comment.createdAt ? comment.createdAt.toDateString() : null
                    };
                } )
            };


            // console.log( newImageData );
            return newImageData;
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};



// POST a single image_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const postImage = ( title, description, imgAuthor, fileName ) => {
    console.log( 'fn: "postImage"' );

    const query = `INSERT INTO images (title, description, img_author, file_name)
                    VALUES ($1, $2, $3, $4)`;
    return db.query( query, [
        title,
        description,
        imgAuthor,
        fileName
    ] ).then().catch( ( err ) => {
        console.error( err.stack );
    } );
};


/* MODULE EXPORTS */
module.exports.getImages = getImages;
module.exports.getImageId = getImageId;
module.exports.postImage = postImage;
