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
            const images = results.rows.map( ( currentObj ) => {
                return {
                    id: currentObj.id,
                    image: s3Url + currentObj.image,
                    username: currentObj.username,
                    title: currentObj.title,
                    description: currentObj.description,
                    created_at: currentObj.created_at
                };
            } );
            return images;
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};



/* MODULE EXPORTS */
module.exports.getImages = getImages;
