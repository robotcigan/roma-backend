'use strict';

const Dropbox = require('dropbox')
    , {accessToken} = require('../config.js').dropbox;

module.exports = {
  addImage: function(file, fileName) {
    let dbx = new Dropbox({accessToken});

    // This uploads basic.js to the root of your dropbox
    return dbx.filesUpload({path: fileName, contents: file})
      .then(response => {
        console.log('response');
        console.log(response);
        return response;
      })
      .catch(err => {
        console.log('err');
        console.log(err);
        throw err;
      });
  }
};