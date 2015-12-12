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

describe('Creative Methods', function() {

  var dfp;

  before(function() {
    dfp = new Dfp(credentials, config, config.refreshToken);
  });

  describe('getCreatives', function() {

    it('should return creative ids', function() {

      var conditions = {
        name: 'B_M300X250MIDDLE_USA_SONOBI_00%'
      };

      return expect(dfp.getCreatives(conditions))
        .to.eventually.be.instanceof(Array)
        .and.to.have.deep.property('[0].id','88079283856');
    });

  });

  describe('prepareCreative', function() {

    it('should lookup partner', function() {
      return expect(dfp.prepareCreative(creative))
        .to.eventually.have.property('advertiserId', '565625056');
    });

    it('should remove passed in partner name', function() {
      return expect(dfp.prepareCreative(creative))
        .to.eventually.not.have.property('partner');
    });

  });

  describe('createCreatives', function() {

    it('should successfully create order', function() {

      var prepareCreative = function(input) {
        return dfp.prepareCreative(input);
      };

      var createCreatives = function(preparedCreative) {
        return dfp.createCreatives(preparedCreative);
      };

      var checkCreated = function(results) {
        return expect(results).to.have.deep.property('[0].id')
          .and.to.eql('99831187816');
      };

      return Bluebird.resolve([creative])
        .bind(this)
        .map(prepareCreative)
        .then(createCreatives)
        .then(checkCreated);
    });

  });

});
