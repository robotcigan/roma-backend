'use strict';

const express = require('express')
    , bodyParser = require('body-parser')
    , app = express()
    , server = require('http').Server(app)
    , appConfig = require('./config')
    , errors = require('./services/errors')
    , mongoPromise = require('./services/mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

app.use('/api/v1/project', require('./routes/project'));

app.use((req, res, next) => {
  if (!req.dataOut) {
    return next();
  }
  res.send({
    success: true
  , data: req.dataOut
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(errors.api.not_found);
});

app.use((err, req, res, next) => {
  res.send({
    success: false
  , error: err
  });
});

mongoPromise.then(() => {
  console.info('MongoDB connected');

  server.listen(appConfig.server.port, appConfig.server.ip, () => {
    console.info('Server start listen', appConfig.server.port);
  });
});