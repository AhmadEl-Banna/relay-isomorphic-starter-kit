# relay-isomorphic-starter-kit

Starter kit for an isomorphic Relay application

**NOTE:** This project is currently not isomorphic, because Relay's server side rendering is still being worked on (https://github.com/facebook/relay/issues/136 and https://github.com/facebook/fbjs/pull/61).

## Features
* Fully automated toolchain with npm run scripts
* Hot reloading Express web server with Winston logging
* Webpack for watching and production builds
* React + React Router for rendering
* InlineCSS-component for styling components
* Relay + React Router Relay for data fetching
* GraphQL + GraphQL Sequelize for automatic GraphQL schema generation from the Sequelize database schema
* Babel.js automatically compiles ES6 + ES7
* React Hot Loader for instant client updates

## Installation
```bash
git clone https://github.com/DanielHuisman/relay-isomorphic-starter-kit
cd relay-isomorphic-starter-kit

npm install
```

## Usage

#### Development
Run one command to start the self-reloading server and the hot loading Webpack development server for the client files:
```bash
# Starts the development server on the port 8080 by default
npm run watch
```

If you make any changes to you GraphQL schema, execute `npm run update-schema` to update it before starting the development server.

#### Production
```bash
NODE_ENV=production npm run build
# Starts the production server on port 8080 by default
NODE_ENV=production npm run start
```

## License
ISC license. Copyright © 2015, Daniel Huisman. All rights reserved.
