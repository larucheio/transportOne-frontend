# transportone-frontend

> A Vue.js project

Site: [transportone.ch](https://transportone.ch)

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Environnement variable

Don't forget to fill up correctly the variables in `prod.env.js`.

## API

The API root url must be configured in the environnement variables. You can obtain the url when you deploy your serverless backend (see [transport-one backend](https://github.com/larucheio/transportOne-backend) docs).

### Endpoints

The API endpoints are based on the [transport-one backend](https://github.com/larucheio/transportOne-backend). You can find a list of the endpoints on the config/api.js file.

## Service Workers

The service worker is used to keep a cached version of the website, to access it offline. It will cache all the requests coming from the website's origin. It can also cache third party requests if we don't cache only the requests with the type `basic`.

:warning: The service workers work only through https or localhost.

## Auth0

Enable username on Auth0 connections database.
