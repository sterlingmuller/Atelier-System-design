CREATE DATABASE ratingsandreviewdb;
\c ratingsandreviewdb;

-- DROP SCHEMA IF EXISTS ratingsandreviewschema CASCADE;
-- CREATE SCHEMA ratingsandreviewschema;

-- SET search_path TO ratingsandreviewschema, public;

-- CREATE TABLE people2 as SELECT id, nationality, name, surname FROM people;
-- DROP TABLE people;


  CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    date BIGINT NOT NULL,
    summary VARCHAR(200) NOT NULL,
    body VARCHAR(1000) NOT NULL,
    recommended BOOLEAN DEFAULT false,
    reported BOOLEAN DEFAULT false,
    reviewer_name VARCHAR(100) NOT NULL,
    reviewer_email VARCHAR(100) NOT NULL,
    response VARCHAR(500),
    helpfulness INT NOT NULL
  );

  Create Table characteristics (
    id SERIAL PRIMARY KEY,
    product_id int NOT NULL,
    name VARCHAR (100) NOT NULL
  );

  CREATE TABLE characteristics_reviews (
    id SERIAL PRIMARY KEY,
    characteristic_id INT NOT NULL,
    review_id INT NOT NULL,
    CONSTRAINT fk_review
      FOREIGN KEY (review_id)
      REFERENCES reviews(id),
    CONSTRAINT fk_characteristics
      FOREIGN KEY (characteristic_id)
      REFERENCES characteristics(id),
    value VARCHAR(200) NOT NULL
  );

  Create Table photos (
    id SERIAL PRIMARY KEY,
    reviews_id INT NOT NULL,
    url VARCHAR(400) NOT NULL,
    CONSTRAINT fk_reviews
      FOREIGN KEY(reviews_id)
      REFERENCES reviews(id)
  );


-- psql -d postgres -f ./database/schema.sql