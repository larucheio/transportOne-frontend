# transportone-frontend

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Environnement variable

Copy `example.prod.env.js` to `prod.env.js` and fill up correctly the variables.

## API

The API root url must be configured in the environnement variables. You can obtain the url when you deploy your serverless backend (see [transport-one backend](https://github.com/larucheio/transportOne-backend) docs).

### Endpoints

The API endpoints are based on the [transport-one backend](https://github.com/larucheio/transportOne-backend). You can find a list of the endpoints on the config/api.js file.
