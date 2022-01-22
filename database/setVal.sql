SELECT setval('reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM reviews), 1), false);
SELECT setval('characteristics_reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM characteristics_reviews), 1), false);
SELECT setval('characteristics_id_seq', COALESCE((SELECT MAX(id)+1 FROM characteristics), 1), false);
SELECT setval('photos_id_seq', COALESCE((SELECT MAX(id)+1 FROM photos), 1), false);
