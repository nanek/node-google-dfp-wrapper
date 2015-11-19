/*global describe before it*/

'use strict';

var Replay = require('replay'); //eslint-disable-line no-unused-vars
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;

var Dfp = require('../index');
var DFP_CREDS = require('../fixtures/setup/application-creds');
var config = require('../fixtures/setup/config');
var reportJob = require('../fixtures/input/report-job');
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

describe('Report Methods', function() {

  var dfp;

  before(function() {
    dfp = new Dfp(credentials, config, config.refreshToken);
  });

  describe('runReportJob', function() {

    it('should return job id', function() {
      return expect(dfp.runReportJob(reportJob))
        .to.eventually.have.property('id')
        .and.to.equal('2555563336');
    });

  });

  describe('getReportJobStatus', function() {

    it('should return status', function() {
      return expect(dfp.getReportJobStatus('2555563336'))
        .to.eventually.equal('COMPLETED');
    });

  });

  describe('getReportDownloadURL', function() {

    var expectedURL = 'https://storage.googleapis.com/dfp-report-export/';
    expectedURL += 'c3ecfab2-1f6c-4b61-a7ff-4f9392004554';
    expectedURL += '?GoogleAccessId=376921769015-q0sqoemp6u2bu3hopfa7hus';
    expectedURL += 'qdb5dvi8g@developer.gserviceaccount.com&Expires=1447';
    expectedURL += '951934&Signature=00E5JjBPW7ZlGSlDwo5mjGEqlEfo7X02Y63';
    expectedURL += 'Yz9JnQROj6l6RJzULlcFjZc0tieDwdvqUEbeIvTXwJEuBdmU%2B7';
    expectedURL += 'vWp5hSig0yqN%2BnSp9NtkpYSHpryc5KYAHmDQ%2FNkgKRU7U%2F';
    expectedURL += 'd8E6DoyV8BogdyT85ozWkWi51MymKTWKUazxVxI2X3SS7ZJghnGN';
    expectedURL += '1tW%2Bn63k2BusdAQr7EPAyQ4sNx1jkXkjFiGQXOuY9f3gcs4jcR';
    expectedURL += 'izytAfKHoGLDF1sxtn%2FrxaS7EPIxq03BThrCGLqkRoOZIcRp0S';
    expectedURL += '2%2Fd%2FFb8wD9pDgdauQh8RKBzubUQ1w9Szbfr49LJlAe3QS72F';
    expectedURL += 'M6a%2Fc0ZwqLA%3D%3D';

    it('should return url', function() {
      return expect(dfp.getReportDownloadURL('2555563336', 'CSV_DUMP'))
        .to.eventually.equal(expectedURL);
    });

  });

});
