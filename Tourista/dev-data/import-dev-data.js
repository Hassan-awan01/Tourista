const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../model/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log(`Connection is established`));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'),
);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data is created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data is deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}
