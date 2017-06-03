'use strict';

Array.prototype.clearByInstances = function(...fields) {
  return this.map(item => item.clear ? item.clear(fields) : item);
};
