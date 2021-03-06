'use strict';

module.exports = {
  destination: function(req, file, done) {
    done(null, './uploads');
  },
  filename: function(req, file, done) {
    const timestamp = Date.now();
    file.timestamp = timestamp;
    done(null, req.params.handle + '-' + timestamp + '-' + file.originalname);
  }
};
