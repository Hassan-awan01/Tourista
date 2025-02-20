const express = require('express');
const tourRouter = require('./Routes/tourRouters');
const userRouter = require('./Routes/userRouters');
const errFeatures = require('./utils/globalErrorHandler');
const errorHandler = require('./controllers/errorController');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const err = new errFeatures(
    `response to this ${req.originalUrl} url not found`,
    404,
  );
  next(err);
});
app.use(errorHandler);
module.exports = app;
