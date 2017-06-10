'use strict';

module.exports = {
  destination: function(req, file, done) {
    done(null, './uploads');
  },
  filename: function(req, file, done) {
    done(null, file.fieldname + '-' + Date.now() + '_' + file.originalname);
  }
};
