const express = require ('express');
const app = express();
const port = 3000;
const db = require('../database');
const path = require('path');
const { getReviews } = require('./actions/reviews');

app.listen(port, () => console.log('listening on port:', port));

app.use(express.json());

app.get('/loaderio-4759efd40f0b5528c44450679f2b26d2.txt', (req, res) => {
  var options = {
    root: path.join(__dirname)
};

var fileName = '../loaderio-4759efd40f0b5528c44450679f2b26d2.txt';
res.sendFile(fileName, options, function (err) {
    if (err) {
        next(err);
    } else {
        console.log('Sent:', fileName);
    }
});
})


//GET REVIEWS
// reviews?page=0&count=2&sort=newest&product_id=5
//linit and offset so set page and count in query

app.get('/reviews', getReviews);

//GET META
// reviews/meta?product_id=7

app.get('/reviews/meta', (req, res) => {
  let { product_id } = req.query;


  const responseObject = {
    product_id: product_id,
    characteristics: {}
  }

  db.query(`SELECT * FROM reviews r WHERE r.product_id=${product_id}`)
    .then( ({rows}) => {
      let reviewsArr = [];
      rows.forEach( (review) => {
        reviewsArr.push();
        db.query(`SELECT * FROM characteristics_reviews cr WHERE cr.review_id=${review.id}`)
          .then( ({rows}) => {

            let avgVal = 0;
            rows.forEach((charReview) => {
              avgVal += charReview.value / rows.length
              db.query(`SELECT * FROM characteristics WHERE id = ${charReview.characteristic_id}`)
              .then(({rows}) => {

                responseObject.characteristics[rows[0].name] = {"id": rows[0].id, "value": Math.round(avgVal * 4) / 4};
              // res.status(200).send(responseObject);

              })

            })

          })
          // .then(() => res.status(200).send(responseObject))
      })
    })
    .then(() => res.status(200).send(responseObject))

    .catch(console.log)

})

//POST REVIEWS
/**
 * example data
 * body: product_id: 1800000, rating: 4, summary: 'really fun', body: 'I had a good time with this product', reviewe_name: 'Johnny Skateboard', reviewer_email: 'shredderboy@w.com', date: current_timestamp, photos: ['nvervnenrv', 'evercwecw', 'rtevcwercw', characteristics: {14: 3, 15: 5, 16: 2} OR characteristics: {fit: 3, comfort: 2}
 */

app.post('/reviews', (req, res) => {
  let { product_id, rating, summary, body, reviewer_name, reviewer_email, photos, characteristics, helpfulness } = req.body;
  var review_id;
  let charKeys = Object.keys(characteristics);

  let sql = 'INSERT INTO reviews (product_id, rating, summary, body, reviewer_name, reviewer_email, helpfulness, date) VALUES ($1, $2, $3, $4, $5, $6, $7, 12423512) RETURNING *';
  db.query(sql, [product_id, rating, summary, body, reviewer_name, reviewer_email, helpfulness])
  //result will contain review id

  //post to photos
    .then( ({ rows }) => {
      review_id = rows[0].id;
      photos.forEach( currentPhoto => db.query('INSERT INTO photos (url, reviews_id) VALUES ($1, $2)', [currentPhoto, review_id]))
    })

    .then(() => { charKeys.forEach( (key) => {

      console.log('key:::', key, review_id, characteristics[key])
      let numKey = parseInt(key);
        db.query('INSERT INTO characteristics_reviews (characteristic_id, review_id, value) VALUES ($1, $2, $3) ', [numKey, review_id, characteristics[key]])
    }
      )}
      )

    .then(() => res.status(201).send('POST SUCCESS!'))
    .catch(console.log);
})

//PUT HELPFUL
// reviews/${3}/helpful

app.put('/reviews/:review_id/helpful', (req, res) => {
  const { review_id } = req.params;
  let sql = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1';
  db.query(sql, [review_id])
  .then (() => res.status(204).send("Helpfuness update success!"))
  .catch(console.log);
})

//PUT REPORTED
// reviews/6/report

app.put('/reviews/:review_id/report', (req, res) => {
  const { review_id } = req.params;
  let sql = 'UPDATE reviews SET reported = NOT reported WHERE id = $1';
  db.query(sql, [review_id])
  .then (() => res.status(204).send("report update success!"))
  .catch (console.log);
})
