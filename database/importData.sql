COPY reviews(id, product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/style/Hackreactor/SDC-sterlo/csvs/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics(id, product_id, name)
FROM '/Users/style/Hackreactor/SDC-sterlo/csvs/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics_reviews(id, characteristic_id, review_id, value)
FROM '/Users/style/Hackreactor/SDC-sterlo/csvs/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

COPY photos (id, reviews_id, url)
FROM '/Users/style/Hackreactor/SDC-sterlo/csvs/reviews_photos.csv'
DELIMITER ','
CSV HEADER;