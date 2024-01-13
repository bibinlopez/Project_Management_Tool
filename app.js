require('dotenv').config();
require('express-async-errors');

const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');

const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const {
  authMiddleware,
  authPermission,
} = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());

app.use('/auth', authRoute);
app.use('/admin', authMiddleware, authPermission, adminRoute);
app.use('/user', authMiddleware, userRoute);

app.use(errorHandler);

const port = 5001;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'butomy_test_post',
    });
    console.log('Connected to the DB');
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
