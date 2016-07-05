# node-google-dfp-wrapper

This project is a wrapper around [node-google-dfp](https://github.com/ShinyAds/node-google-dfp) aimed at facilitating repeated interactions with the DFP API in a script.

### Getting started

```bash
$ npm install node-google-dfp-wrapper
```

```javascript
var Dfp = require('node-google-dfp-wrapper');

// These are created by you in the configuration step
var config = require('../local/config')

// These are output by DFP as part of the DFP project authorization step.
var credentials = require('../local/application-creds');

// This is obtained as part of the obtain refresh token step
var refreshToken = config.refreshToken;

var dfp = new Dfp(credentials, config, refreshToken);
```

### How to use

For examples of how to use this library, please refer to https://github.com/spanishdict/example-dfp-line-item-generator

### One-time setup

#### Configuration

These values are created by you, except for `refreshToken`. If you do not have one, follow the directions below.

```JSON
{
 "networkCode": "<network code>",
 "appName": "<Name of your app>",
 "version": "<version number>",
 "refreshToken": "<refresh token>"
}
```

To obtain your network code from DFP. It can be found in your url after you log in to DFP. For example in `https://www.google.com/dfp/1027916#delivery`, the network code is 1027916.

#### Obtain refresh token

1. Run:

  ```bash
  $ cd node_modules/node-google-dfp-wrapper/
  $ node generate-authentication-url.js
  ```

Go to the url and give authorization. Copy the auth code.

2. Run the script in "auth code" mode:

  ```bash
  $ node generate-refresh-token.js --authCode <auth code>
  ```

  If you are using this package as a dependency and local/application-creds lives in your project you can pass the config path as an arguments as follow:

  ```bash
  $ node node_modules/node-google-dfp-wrapper/generate-authentication-url.js --config $(pwd)'/local/application-creds'
  $ node node_modules/node-google-dfp-wrapper/generate-refresh-token.js --config $(pwd)'/local/application-creds' --authCode <auth code>
  ```


This will output a refresh token.

#### DFP project authorization

1. Log into Google.
2. Go to <https://console.developers.google.com/project>.
3. Make a project for your app.
4. Go to <https://console.developers.google.com/apis/credentials?project=<your-project-name>.
5. Click on `New Credentials` and then on `OAuth client ID`
6. Click on `Configure consent screen` and give your project a name.
7. Under `Application type` select `Other` and give your client a name.
8. You should now see a new entry under `OAuth 2.0 client IDs` and a download icon to the far right. Click that icon to download your cerdentials. Save the file as `local/application-creds.json`. It should look like this, (though you may have to format it):

```JSON
{
  "installed": {
    "client_id": "<client id>",
    "project_id": "<project id>",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "<client secret>",
    "redirect_uris": [
      "urn:ietf:wg:oauth:2.0:oob",
      "oob"
    ]
  }
}
```
