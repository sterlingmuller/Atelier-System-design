module.exports = {
  /**
   * Sorts reviews by `desc`, `helpfulness`, or `newest`
   */
  sortOpt(sort) {
    if (sort === 'newest') {
      return "ORDER BY date DESC"
    } else if (sort === 'helpful') {
      return "ORDER BY helpfulness"
    }
    else if (sort === 'relevant') {
      return "ORDER BY recommended DESC"
    }
  },

  resultRange(resArr, page, count) {
    page = Number(page);
    count = Number(count);
    let start = page * count;
    return (resArr.slice(start, start + count));
  }
}