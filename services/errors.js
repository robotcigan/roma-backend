'use strict';

const _ = require('lodash');

let errList = {
  api: {
    default: {
      code: 1000,
      description: 'Unknown api error'
    },
    bad_params: {
      code: 1001,
      description: 'Wrong input parameters'
    },
    not_found: {
      code: 1002,
      description: 'Route not found'
    },
    no_input_files: {
      code: 1003,
      description: 'No input files to upload'
    },
    file_processing_problem: {
      code: 1004,
      description: 'File processing problem'
    },
    access_denied: {
      code: 1005,
      description: 'Access denied for this action'
    },
    object_not_found: {
      code: 1006,
      description: 'Object not found'
    }
  },
  dbo: {
    default: {
      code: 2000,
      description: 'Unknown dbo error'
    }
  },
  metadata: {
    default: {
      code: 3000,
      description: 'Metadata error'
    },
  },
  project: {
    default: {
      code: 4000,
      description: 'Project error'
    },
    not_found: {
      code: 4001,
      description: 'Project |var| not found'
    }
  },
  image: {
    default: {
      code: 5000,
      description: 'Image error'
    },
    not_found: {
      code: 5001,
      description: 'Image |var| not found'
    }
  }
};

/**
 * Assign original error
 * @param {object} ob
 * @param {object} originalError
 * @return {Object}
 */
function extendError(ob, originalError) {
  return _.extend(ob, {originalError: originalError});
}

/**
 * Assign handle to each error
 * @param {object} errObj
 */
function assignEx(errObj) {
  errObj['ex'] = function(originalError) {
    return extendError(errObj, originalError);
  };
  errObj['mongoErr'] = function(err) {
    if (err.name === 'MongoError') {
      return {
        code: errObj.code,
        description: err.errmsg
      };
    }
  };
  errObj['withVar'] = function(data) {
    return {
      code: errObj.code,
      description: errObj.description.replace(/\|var\|/gi, data)
    };
  };
}

/**
 * Init assign
 * @param {object} object
 */
function deepAssign(object) {
  _.each(object, (val) => {
    if (_.isObject(val) || _.isArray(val)) {
      deepAssign(val);
    }
  });
  assignEx(object);
}

deepAssign(errList);

module.exports = errList;