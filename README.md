# Spotify Web Remote
This is a web based remote/commander for spotify. It works with the Spotify web api and can be used to control your spotify account. First you'll have to set up the API keys.

## Setting up the authorization
[TODO]

## Run locally
- Install node packages, `$ npm install` (in root folder)
- Install client packages (in client folder)
  - Run npm `$ npm install`
  - Run bower `$ bower install`
  - Run grunt `$ grunt`
  - (Optional: `$ grunt watch`)
- Run server `$ node .`

## Deploy
- Copy `ecosystem.json.default` to `ecosystem.json` and set ip-address, username, etc
- Setup deployment `$ pm2 deploy production|development setup` (only the first time)
- Deploy `$ pm2 deploy production|development`