/*global describe before it*/

'use strict';

var Replay = require('replay'); //eslint-disable-line no-unused-vars
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;

var Dfp = require('../index');
var DFP_CREDS = require('../fixtures/setup/application-creds');
var config = require('../fixtures/setup/config');
var credentials;

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

describe('Advertiser Methods', function() {

  var dfp;

  before(function() {
    dfp = new Dfp(credentials, config, config.refreshToken);
  });

  describe('getAdvertiser', function() {

    it('should return advertiser id', function() {
      var conditions = {
        name: 'Sonobi'
      };
      return expect(dfp.getAdvertiser(conditions))
        .to.eventually.equal('565625056');
    });

  });

});
