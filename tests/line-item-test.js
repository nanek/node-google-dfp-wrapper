/*global describe before it*/

'use strict';

var Replay = require('replay'); //eslint-disable-line no-unused-vars
var chai = require('chai');
var Bluebird = require('Bluebird');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

var Dfp = require('../index');
var DFP_CREDS = require('../fixtures/setup/application-creds');
var config = require('../fixtures/setup/config');
var credentials;

var lineItem = require('../fixtures/input/line-item');

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

describe('Line Item Methods', function() {
  var dfp;

  before(function() {
    dfp = new Dfp(credentials, config, config.refreshToken);
  });

  describe('getLineItems', function() {

    it('should get line item ids', function() {

      var conditions = {
        name: 'A_D300X250CONTENT_USA_AMAZON_0025'
      };

      return expect(dfp.getLineItems(conditions))
        .to.eventually.be.instanceof(Array)
        .and.to.have.deep.property('[0].id', '912580336');
    });

  });

  describe('prepareLineItem', function() {

    it('should lookup order', function() {
      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.have.property('orderId', '421781056');
    });

    it('should remove passed in order name', function() {
      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.not.have.property('orderName');
    });

    it('should add start date', function() {
      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.have.deep.property('startDateTime.date')
        .and.to.eql({
          year: '2025',
          month: '12',
          day: '11',
        });
    });

    it('should remove passed in date', function() {
      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.not.have.property('date');
    });

    it('should lookup adunit', function() {
      var adUnitId = 'targeting.inventoryTargeting.targetedAdUnits[0].adUnitId';
      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.have.deep.property(adUnitId, '124991056');
    });

    it('should remove passed in ad unit name', function() {
      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.not.have.property('adUnitName');
    });

    it('should lookup criteria key', function() {
      var criteria = 'targeting.customTargeting.children[0].children';
      var criteriaKey = criteria + '[0].keyId';

      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.have.deep.property(criteriaKey, '597016');
    });

    it('should lookup criteria key', function() {
      var criteria = 'targeting.customTargeting.children[0].children';
      var criteriaValue = criteria + '[0].valueIds';

      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.have.deep.property(criteriaValue)
        .and.to.eql(['126109156816']);
    });

    it('should remove passed in criteria', function() {
      return expect(dfp.prepareLineItem(lineItem))
        .to.eventually.not.have.property('customCriteriaKVPairs');
    });

  });

  describe('createLineItems', function(){

    it('should successfully make line item', function(){
      var prepareLineItem = function(lineItem){
        return dfp.prepareLineItem(lineItem);
      };

      var createLineItems = function(preparedLineItem){
        return dfp.createLineItems([preparedLineItem]);
      };

      var checkCreated = function(results){
        return expect(results).to.have.deep.property('[0].id')
          .and.to.eql('1058773456');
      };

      return Bluebird.resolve(lineItem)
        .bind(this)
        .then(prepareLineItem)
        .then(createLineItems)
        .then(checkCreated);
    })
  });

});
