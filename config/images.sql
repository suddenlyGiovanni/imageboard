DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    img_filename VARCHAR(300) NOT NULL,
    img_author VARCHAR(255) NOT NULL,
    img_title VARCHAR(255) NOT NULL,
    img_description TEXT,
    img_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    img_id INTEGER NOT NULL REFERENCES images(id),
    com_author VARCHAR(255) NOT NULL,
    com_text TEXT NOT NULL,
    com_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
