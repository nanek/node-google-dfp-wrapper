'use strict';

// Generate authentication url.

var google = require('googleapis');
var argv = require('minimist')(process.argv.slice(2));
var config = argv.config || './local/application-creds';
var DFP_CREDS = require(config);

var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  DFP_CREDS.installed.client_id,
  DFP_CREDS.installed.client_secret,
  DFP_CREDS.installed.redirect_uris[0]
);

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/dfp'
  ]
});

console.log('Go to: %s', url);
