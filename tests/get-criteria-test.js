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

describe('Criteria methods', function() {

  var dfp;

  before(function() {
    dfp = new Dfp(credentials, config, config.refreshToken);
  });

  describe('getCriteriaKey', function() {

    it('should return key id', function() {
      var conditions = {
        name: 'sbi_mouse'
      };

      return expect(dfp.getCriteriaKey(conditions))
        .to.eventually.equal('597016');
    });

  });

  describe('getCriteriaValues', function() {

    it('should return value ids', function() {
      var conditions = {
        name: '0.95',
        customTargetingKeyId: '597016'
      };

      return expect(dfp.getCriteriaValue(conditions))
        .to.eventually.deep.equal('126109156816');
    });

  });

  describe('getCriteria', function() {

    it('should return key and values ids', function() {
      var conditions = {
        sbi_mouse: '0.95'
      };

      return expect(dfp.getCriteria(conditions))
        .to.eventually.deep.equal([{
          keyId: '597016',
          valueIds: ['126109156816']
        }]);
    });

  });

});
