const { sortOpt, resultRange } = require("../utils");
const db = require('../../database');

module.exports = {
  getReviews(req, res) {
    let { page = 0, count = 5, sort = "newest", product_id } = req.query;
    let sql = `SELECT * FROM reviews WHERE product_id=$1 ORDER BY $2`;
    console.log("db test:::", db);
    db.query(sql, [product_id, sort])
      .then(({ rows }) => {
        console.log('rows:::', rows)
        res.status(200).send(
          {
            'product': product_id,
            'page': page,
            'count': count,
            'results': resultRange(rows, page, count)
          }
          //try using json agg function
        );
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      });
  }
}