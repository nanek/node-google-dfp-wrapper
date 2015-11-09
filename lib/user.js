'use strict';

var util = require('util');
var Dfp = require('node-google-dfp');
var Bluebird = require('bluebird');

/**
 * Instantiate a connection to the DFP api.
 * @class
 */
function DfpUser() {
  Dfp.User.apply(this, arguments);
  this._services = {};
}

util.inherits(DfpUser, Dfp.User);

/**
 * Store the service in a cache for quicker access.
 *
 * @param  {String} serviceName Name by which to find the service.
 * @param  {Object} service     The service returned by the DFP api.
 * @return {[type]}             [description]
 */
DfpUser.prototype.cacheService = function(serviceName, service) {
  this._services[serviceName] = service;
};

/**
 * Looks up the service in the cached services. If not found, it gets it from
 * DFP and then caches it.
 *
 * @param  {String} serviceName The name of the service to lookup.
 * @return {Object}             The service as returned by DFP.
 */
DfpUser.prototype.getCachedService = function(serviceName) {
  var ctx = this;
  if (!this._services[serviceName]) {
    return Bluebird.fromNode(
        function(cb) {
          ctx.getService(serviceName, function(service) {
            cb(null, service);
          });
        })
      .then(function(service) {
        ctx.cacheService(serviceName, service);
        return service;
      });
  }
  return Bluebird.resolve(ctx._services[serviceName]);
};


/**
 * Wraps calls to the DFP api so that they are promisified and lookup their
 * service before hand in.
 *
 * @param  {String} service The name of the service that contains the function.
 * @param  {String} func    The name of the api method to call.
 * @param  {Object} params  The data that should be sent along with the method
 *                          call.
 *
 * @return {Object}         Response from the DFP api.
 */
DfpUser.prototype.executeAPIFunction = function(service, func, params) {
  return this.getCachedService(service)
    .then(function(svc) {
      return Bluebird.fromNode(function(cb) {
        svc[func](params, function(err, results) {
          cb(err, results.rval);
        });
      });
    });
};

module.exports = {
  DfpUser: DfpUser,
};
