'use strict';

module.exports = {
  destination: function(req, file, done) {
    done(null, './uploads');
  },
  filename: function(req, file, done) {
    const timestamp = Date.now();
    req.body.timestamp = timestamp;
    done(null, req.params.handle + '-' + timestamp + '-' + file.originalname);
  }
};
