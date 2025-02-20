/// MONGOOSE HISTORY CODE

// const TourSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: [true, 'Name of the our required'],
//       unique: true,
//     },
//     rating: {
//       type: Number,
//       default: 4.5,
//     },
//     price: {
//       type: Number,
//       required: [true, 'Price of the tour required'],
//     },
//   });
//   const Tour = mongoose.model('Tour', TourSchema);
//   const tour = new Tour({
//     name: 'sailkot',
//     rating: 4.7,
//     price: 500,
//   });
//   tour
//     .save()
//     .then((doc) => console.log(doc))
//     .catch((err) => console.log(err));

/// tour Controller History

// const fs = require('fs');
// let tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
// );

// exports.checkId = (req, res, next, val) => {
//     tour = tours.find((ele) => ele.id == req.params.id);
//     if (!tour) {
//       return res.status(404).json({ status: 'fail', message: 'invalid ID' });
//     }
//     next();
//   };

// const newID = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newID }, req.body);
//   tours.push(newTour);
//   console.log(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//           tours,
//         },
//       });
//     },
//   );
// first method
// const tour = new Tour({})
// tour.save().then()

// alternative method
////  to completely implement it read  file than update  the tour than write it on the file than  show it

// if (tours.length < req.params.id * 1) {
//   return res.status(404).json({ status: 'fail', message: 'invalid ID' });
// }
