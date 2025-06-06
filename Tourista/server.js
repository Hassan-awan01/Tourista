const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log(`Connection is established`));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to the ${port}...`);
});
