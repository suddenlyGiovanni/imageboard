// dbQuery.js

// REQUIRED MODULES_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const spicedPg = require( 'spiced-pg' );
const db = spicedPg( process.env.DATABASE_URL || require( '../config/secrets.json' ).psqlConfig );
const s3Url = require( '../config/config.json' ).s3Url;


// GET ALL images
const getImages = () => {

    console.log( 'fn: "getImages"' );

    const query = `SELECT   id AS imgId,
                            image,
                            img_author AS "imgAuthor",
                            title,
                            description,
                            created_at AS "createdAt"
                    FROM images`;

    return db.query( query )

        .then( ( results ) => {
            // console.log( results );
            return results.rows.map( ( currentObj ) => {
                currentObj.image = s3Url + currentObj.image;
                currentObj.createdAt = currentObj.createdAt.toDateString();
                return currentObj;
            } );
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};

// POST a single image_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const postImage = ( title, description, imgAuthor, image ) => {
    console.log( 'fn: "postImage"' );

    const query = `INSERT INTO images (title, description, img_author, image)
                    VALUES ($1, $2, $3, $4)`;
    return db.query( query, [
        title,
        description,
        imgAuthor,
        image
    ] ).then().catch( ( err ) => {
        console.error( err.stack );
    } );
};

// GET a specific image _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const getImageId = ( imageId ) => {

    console.log( 'fn: "getImageId"' );

    const query = `SELECT   images.id AS "imageId",
                    		images.image,
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

            console.log( imageIdData );

            let newImageData = {};

            function makeNewObj() {
                newImageData.imageId = imageIdData[ 0 ].imageId;
                newImageData.image = s3Url + imageIdData[ 0 ].image;
                newImageData.imgAuthor = imageIdData[ 0 ].imgAuthor;
                newImageData.title = imageIdData[ 0 ].title;
                newImageData.description = imageIdData[ 0 ].description;
                newImageData.comments = [];
            }

            function makeCommentsArray() {
                imageIdData.forEach( ( currComment ) => {
                    newImageData.comments.push( {
                        commentId: currComment.commentId,
                        commAuthor: currComment.commAuthor,
                        comment: currComment.comment,
                        createdAt: currComment.createdAt.toDateString()
                    } );
                } );
            }


            makeNewObj();
            makeCommentsArray();

            console.log( newImageData );
            return newImageData;
            // return imageIdData;
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};









/* MODULE EXPORTS */
module.exports.getImages = getImages;
module.exports.getImageId = getImageId;
module.exports.postImage = postImage;
