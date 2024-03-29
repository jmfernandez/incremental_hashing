About incremental hashing
=========================

Exploring local files hash computation through javascript.

It uses [CryptoJS](https://code.google.com/archive/p/crypto-js/) , and the example is inspired on one from [SparkMD5](https://github.com/satazor/js-spark-md5) distro.

Installation
------------

1) Install latest stable [NodeJs](http://nodejs.org/) release, either using your operating system / distribution package manager, or by hand.

(If you have installed NodeJs by hand, remember to add its `bin` subdirectory to the `PATH` environment variable)

2) You could also need `ruby` and `gem`.

3) Clone this repository, and run `npm install yarn`, so [Yarn](https://yarnpkg.com/) dependency, which is used to fetch [Webpack](https://webpack.github.io/) and other dependencies are installed:

```bash
git clone https://github.com/inab/comorbidities.git
npm install yarn

```

4) Add `node_modules/.bin` subdirectory to the `PATH` environment variable, so `yarn` can be instantiated (and the dependencies fetched):

```bash
PATH="$(npm root)/.bin:${PATH}"
export PATH
yarn
```

5) Now you have to run `webpack` in order to prepare and deploy the incremental hashing demonstration, which will be deployed at `dist` subdirectory.

```bash
webpack --progress
```

6) You can serve the proof of concept just running:

```bash
webpack serve
```

and opening http://localhost:8080/incremental_hashing_example.html in your browser.
