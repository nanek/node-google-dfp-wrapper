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

var creative = require('../fixtures/input/creative');

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

describe('Association Methods', function() {

  var dfp;

  before(function() {
    dfp = new Dfp(credentials, config, config.refreshToken);
  });

  describe('getAssociations', function() {

    it('should return association for line item', function() {
      this.timeout(10000)
      var conditions = {
        lineItemId: '947887696',
        creativeId: '88079283856'
      };

      return expect(dfp.getAssociations(conditions))
        .to.eventually.be.instanceof(Array)
        .and.to.have.deep.property('[0].lineItemId', '947887696');
    });

  });

  describe('createAssociation', function() {

    it('should successfully create association', function() {

      var createAssociations = function(associations) {
        return dfp.createAssociations(associations);
      };

      var checkCreated = function(results) {
        return expect(results).to.have.deep.property('[0].lineItemId')
          .and.to.eql('1058735296');
      };

      var association = {
        lineItemId: '1058735296',
        creativeId: '99831993736'
      };

      return Bluebird.resolve([association])
        .bind(this)
        .then(createAssociations)
        .then(checkCreated);
    });

  });

});
