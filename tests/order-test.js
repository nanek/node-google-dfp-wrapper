/*global describe before it*/

'use strict';

var Replay = require('replay'); //eslint-disable-line no-unused-vars
var chai = require('chai');
var Bluebird = require('bluebird');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

var Dfp = require('../index');
var DFP_CREDS = require('../fixtures/setup/application-creds');
var config = require('../fixtures/setup/config');
var credentials;

var order = require('../fixtures/input/order');

// Override with local configs if recording
if (process.env['REPLAY'] === 'record') { //eslint-disable-line no-process-env
  DFP_CREDS = require('../local/application-creds');
  config = require('../local/config');
}

credentials = {
  clientId: DFP_CREDS.installed.client_id,
  clientSecret: DFP_CREDS.installed.client_secret,
  redirectUrl: DFP_CREDS.installed.redirect_uris[0]
};

chai.use(chaiAsPromised);

describe('Order Methods', function() {

  var dfp;

  before(function() {
    dfp = new Dfp(credentials, config, config.refreshToken);
  });

  describe('getOrder', function() {

    it('should return order id', function() {
      var conditions = {
        name: 'TEST_ORDER1'
      };
      return expect(dfp.getOrder(conditions))
        .to.eventually.equal('421781056');
    });

  });

  describe('prepareOrder', function() {

    it('should lookup partner', function() {
      return expect(dfp.prepareOrder(order))
        .to.eventually.have.property('advertiserId', '565625056');
    });

    it('should remove passed in partner name', function() {
      return expect(dfp.prepareOrder(order))
        .to.eventually.not.have.property('partner');
    });

  });

  describe('createOrder', function() {

    it('should successfully create order', function() {

      var prepareOrder = function(input) {
        return dfp.prepareOrder(input);
      };

      var createOrder = function(preparedOrder) {
        return dfp.createOrder(preparedOrder);
      };

      var checkCreated = function(results) {
        return expect(results).to.have.deep.property('[0].id')
          .and.to.eql('473989936');
      };

      return Bluebird.resolve(order)
        .bind(this)
        .then(prepareOrder)
        .then(createOrder)
        .then(checkCreated);
    });

  });

});
