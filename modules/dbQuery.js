// dbQuery.js

// REQUIRED MODULES_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const spicedPg = require( 'spiced-pg' );
const db = spicedPg( process.env.DATABASE_URL || require( '../config/secrets.json' ).psqlConfig );
const s3Url = require( '../config/config.json' ).s3Url;


// GET ALL images
const getImages = () => {

    console.log( 'fn: "getImages"' );

    const query = `SELECT   id AS "imgId",
                            img_filename AS "imgFilename",
                            img_author AS "imgAuthor",
                            img_title AS "imgTitle",
                            img_description AS "imgDescription",
                            img_created_at AS "imgCreatedAt"
                    FROM images`;

    return db.query( query )

        .then( ( results ) => {
            // console.log( results );
            return results.rows.map( ( currentObj ) => {
                currentObj.imgFilename = s3Url + currentObj.imgFilename;
                currentObj.imgCreatedAt = currentObj.imgCreatedAt.toDateString();
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

    const query = `SELECT   images.id AS "imgId",
                    		images.img_filename AS "imgFilename",
                    		images.img_author AS "imgAuthor",
                    		images.img_title AS "imgTitle",
                    		images.img_description AS "imgDescription",
                    		comments.id AS "comId",
                    		comments.com_author AS "comAuthor",
                    		comments.com_text AS "comText",
                    		comments.com_created_at AS "comCreatedAt"
                    FROM images
                    LEFT JOIN comments
                    ON images.id = comments.img_id
                    WHERE images.id = $1
                    ORDER BY comments.com_created_at DESC NULLS LAST;`;

    return db.query( query, [ imageId ] )

        .then( ( results ) => {

            const imgIdData = results.rows;

            // console.log( imageIdData );

            const newImgData = {
                imgId: imgIdData[ 0 ].imgId,
                imgFilename: s3Url + imgIdData[ 0 ].imgFilename,
                imgAuthor: imgIdData[ 0 ].imgAuthor,
                imgTitle: imgIdData[ 0 ].imgTitle,
                imgDescription: imgIdData[ 0 ].imgDescription,
                comments: imgIdData.filter( function ( comment ) {
                    return comment.commentId;
                } ).map( function ( comment ) {
                    return {
                        comId: comment.comId,
                        comAuthor: comment.comAuthor,
                        comText: comment.comText,
                        comCreatedAt: comment.comCreatedAt ? comment.comCreatedAt.toDateString() : null
                    };
                } )
            };


            // console.log( newImgData );
            return newImgData;
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};


// POST a single image_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const postImage = ( imgFilename, imgAuthor, imgTitle, imgDescription ) => {
    console.log( 'fn: "postImage"' );

    const query = `INSERT INTO images (img_filename, img_author, img_title, img_description  )
                    VALUES ($1, $2, $3, $4)
                    RETURNING id AS "imgId",
                    	img_filename AS "imgFilename",
                    	img_author AS "imgAuthor",
                    	img_title AS "imgTitle",
                    	img_description AS "imgDescription",
                    	img_created_at AS "imgCreatedAt"`;
    return db.query( query, [
        imgFilename,
        imgAuthor,
        imgTitle,
        imgDescription,
    ] )

        .then( ( results ) => {
            const imgIdData = results.rows[ 0 ];
            imgIdData.imgFilename = s3Url + imgIdData.imgFilename;
            imgIdData.imgCreatedAt = imgIdData.imgCreatedAt.toDateString();
            return imgIdData;
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};


// POST a comment on an image_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const postComment = ( imgId, comAuthor, comText ) => {
    console.log( 'fn: "postComment"' );
    const query = `INSERT INTO comments (img_id, com_author, com_text)
                    VALUES ($1, $2, $3)
                    RETURNING id`;
    return db.query( query, [
        imgId,
        comAuthor,
        comText
    ] )

        .then( ( id ) => {
            if ( id ) {
                return {
                    success: true
                };
            }
        } )

        .catch( ( err ) => {
            console.log( err.stack );
        } );
};


/* MODULE EXPORTS */
module.exports.getImages = getImages;
module.exports.postImage = postImage;
module.exports.getImageId = getImageId;
module.exports.postComment = postComment;
