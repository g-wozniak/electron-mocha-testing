# NodeJS/React web application testing with Electron

The example is a demo of end-to-end testing framework that uses Electron, Mocha and Browser Monkey (https://github.com/featurist/browser-monkey) for web application (NodeJS/React/TypeScript) testing. The benefit of the solution is primarily that:
- it is possible to carry transparent black box testing of a web application simulating every necessary behaviour
- it is possible to plug your back-end directly into front-end (i.e. you can debug a microservice response for a particular test before it reaches a front-end, or see how your app will behave if your database is inaccessible etc.)
- developer can modify and see Redux stack and React state, virtual dom during the test
- it is possible to control the application journey without limitation (routing, actions)
- you are in possession of a visual representation of how your application really works
- you can launch other (non visual) tests in the same framework / test stack, without splitting into different technologies
- works on Linux and iOS

## How to run?

1. Clone the repository

2. `npm ci` to install all packages

Then you have a few options:

- Execute `npm start` to launch the application in a local mode (port 3000)

- Execute `npm run app` to launch the API

- Execute `npm test` to launch a windowed testing framework

- Execute `npm run test:text` to launch tests in the text mode

- Execute `npm run test:watch` to launch tests with a watcher

Note that you can modify the framework up to your preferences and needs using https://www.electronjs.org/docs . 


## Demo

The gif video from the demo is attached.

(todo)

## Thank you

Thank you Featurist (https://featurist.co.uk/) for changing my way of thinking about web application testing. Thank you, JPRichardson (https://github.com/jprichardson/electron-mocha) for Electron Mocha package that saved a lot of time whilst preparing this demo.

