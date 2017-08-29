// dbQuery.js

// REQUIRED MODULES_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const spicedPg = require( 'spiced-pg' );
const db = spicedPg( process.env.DATABASE_URL || require( '../config/secrets.json' ).psqlConfig );
const s3Url = require( '../config/config.json' ).s3Url;


// GET ALL images
const getImages = () => {

    console.log( 'fn: "getImages"' );

    const query = 'SELECT * FROM images';

    return db.query( query )

        .then( ( results ) => {
            // console.log( results );
            return results.rows.map( ( currentObj ) => {
                currentObj.image = s3Url + currentObj.image;
                return currentObj;
            } );
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};

const postImage = ( title, description, userName, image ) => {
    console.log( 'fn: "postImage"' );

    const query = `INSERT INTO images (title, description, userName, image)
                    VALUES ($1, $2, $3, $4)`;
    return db.query( query, [
        title,
        description,
        userName,
        image
    ] ).then().catch( ( err ) => {
        console.error( err.stack );
    } );
};



/* MODULE EXPORTS */
module.exports.getImages = getImages;
module.exports.postImage = postImage;
