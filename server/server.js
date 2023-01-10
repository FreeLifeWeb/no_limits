const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = require('./routers/userRouter');
const resumeRouter = require('./routers/resumeRouter');
const apiRouter = require('./routers/apiRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
}));

app.use('/user', userRouter);
app.use('/resume', resumeRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
