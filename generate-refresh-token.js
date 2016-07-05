'use strict';

var google = require('googleapis');
var Bluebird = require('bluebird');
var OAuth2 = google.auth.OAuth2;
var argv = require('minimist')(process.argv.slice(2));
var config = argv.config || './local/application-creds';
var DFP_CREDS = require(config);

// Constants and arguments.
var AUTH_CODE = argv.authCode;

function getRefreshToken () {
  var oauth2Client;
  var msg = 'Getting new refresh token with auth code %s...';
  console.log(msg, AUTH_CODE); // eslint-disable-line no-console

  oauth2Client = new OAuth2(
    DFP_CREDS.installed.client_id,
    DFP_CREDS.installed.client_secret,
    DFP_CREDS.installed.redirect_uris[0]
  );

  oauth2Client.getToken(AUTH_CODE, function showToken (error, token) {
    var tokenMsg = 'Got refresh token: %s';
    if (error) {
      console.error('Error: ', error); // eslint-disable-line no-console
    } else {
      console.log(tokenMsg, token.refresh_token); // eslint-disable-line no-console
    }
  });
}

// Kick things off.
getRefreshToken();
