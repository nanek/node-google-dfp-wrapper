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
if ( process.env['REPLAY'] === 'record') { //eslint-disable-line no-process-env
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

  it('getCriteriaKey should return key id', function() {
    var conditions = {
      name: 'sbi_mouse'
    };
    return expect(dfp.getCriteriaKey(conditions))
      .to.eventually.equal('597016');
  });

  // it('getCriteriaValues should return value ids', function() {
  //   var conditions = {
  //     name: '0.95',
  //     keyId: '597016'
  //   }
  //   return expect(dfp.getCriteriaValues(conditions))
  //     .to.eventually.deep.equal(['140750957536']);
  // })
});


// var conditions = {
//   sbi_mouse: '0.95'
// };

// dfp.getCriteria(conditions)
//   .then(function(criteria){
//     console.log(criteria);
//   })
