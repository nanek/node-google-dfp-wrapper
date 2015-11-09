### Getting started

```bash
$ npm install @spanishdict/node-google-dfp-wrapper
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

#### Obtain refresh token

1. Obtain your network code from DFP. It can be found in your url after you log
   in to DFP. For example in `https://www.google.com/dfp/1027916#delivery`,
   the network code is 1027916.
2. Run:

    ```
    $ cd node_modules/node-google-dfp-wrapper/
    $ node generate-authentication-url.js
    ```

Go to the url and give authorization. Copy the auth code.

3. Run the script in "auth code" mode:

   ```
   $ node generate-refresh-token.js --networkCode <network code> --authCode <auth code>
   ```

This will output a refresh token.

#### DFP project authorization

Log into Google.

Go to <https://console.developers.google.com/project>. Make a project for your app and then go to <https://console.developers.google.com/project/your-app/apiui/credential>.

Click Download JSON. Save the file as `local/application-creds.json`. It should look like:

```JSON
{
  "installed": {
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_id": "<client id>",
    "client_x509_cert_url": "",
    "redirect_uris": [
      "urn:ietf:wg:oauth:2.0:oob",
      "oob"
    ],
    "client_email": "",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "client_secret": "<client secret>",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth"
  }
}
```

