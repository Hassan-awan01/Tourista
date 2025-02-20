const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of the our required'],
      unique: true,
      trim: true,
      maxLength: [40, 'Name hould have less than 40 characters'],
      minLength: [10, 'Name should have more than or equal to 10 characters'],
      validate: [
        validator.isAlpha,
        'name should have only characters with no space',
      ],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have Group Size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A must must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty should be easy, medium or difficult',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating should be more or qual to 1.0'],
      max: [5, 'Rating should be less or qual to 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price of the tour required'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val <= this.price;
        },
        message: 'dicount should be less than or equal to price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A Tour must have summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a Image'],
    },
    slug: String,
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

TourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// MIDDlE WARE IN MONGOOSE
// 1. DOCUMENT MIDDLE WARE
TourSchema.pre('save', function (next) {
  console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});
// TourSchema.post('save', function (doc, next) {
//   console.log('saved the document ');
//   next();
// });

// Query MIDDLEWARE
// suppose we want to hide specific information ot the information is only for VIPS
// TourSchema.pre('find',function(next){ this run only for find not for findOne and others
TourSchema.pre(/^find/, function (next) {
  // This will run for all queries that start with "find" (find, findOne, etc.)
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

TourSchema.post(/^find/, function (docs, next) {
  // This will run for all queries that start with "find"
  console.log(`Query took ${Date.now() - this.start} ms`);
  console.log(docs);
  next();
});

TourSchema.pre('aggregate', function (next) {
  // this.pipeline() this will store the array  of out aggreagate object
  //this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', TourSchema);
module.exports = Tour;
