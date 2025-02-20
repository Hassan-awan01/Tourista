class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedields = ['limit', 'sort', 'page', 'fields'];
    excludedields.forEach((ele) => delete queryObj[ele]);
    // console.log(queryObj);
    // console.log(this.queryString);
    //<--------------------------------------------------------->
    // Advance filtering
    //duration: { gte: '5' }, difficulty: 'easy' }
    //duration: { $gte: '5' }, difficulty: 'easy' }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\bgte|gt|lte|lt\b/g,
      (match) => (match = `$${match}`),
    );

    console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
    //<------------------------------------>
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' '); // multiple sorting fileds
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }

  limitFiels() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' '); // multiple sorting fileds
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
